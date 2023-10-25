import json
import os
import spacy
import crosslingual_coreference

DEVICE = -1
coref = spacy.load('en_core_web_sm', disable=['ner', 'tagger', 'parser', 'attribute_ruler', 'lemmatizer'])

from neo4j import GraphDatabase
from minio import Minio
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import create_engine, text, select
from sqlalchemy.orm import sessionmaker
from typing import List
import nltk
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag
from model import Document
import uuid
from schema import Questions, Annotations

# Create a SQLAlchemy engine and session
engine = create_engine(os.getenv('DATABASE_URL'))
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

minio_client = Minio(
    "minio:9000",
    access_key="your_access_key",
    secret_key="your_secret_key",
    secure=False  # Set to True if you are using HTTPS
)

uri = "bolt://neo4j:7687"  # Change this to your Neo4j server URI
username = "neo4j"
password = "your_password"

app = FastAPI()

origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def preprocess(sent):
    sent = nltk.word_tokenize(sent)
    sent = nltk.pos_tag(sent)
    return sent

def store_word_and_tag(tx, word, tag, document_id):
    query = """
    MERGE (w:Word {word: $word, document_id: $document_id})
    MERGE (t:Tag {tag: $tag})
    MERGE (w)-[:HAS_TAG]->(t)
    """
    tx.run(query, word=word, tag=tag, document_id=document_id)

@app.get("/")
def read_root():
    return {"message": "Hello, Welcome to GraphLabel APIs!"}

@app.get("/documents")
async def get_all_documents():
    db = SessionLocal()
    results = db.query(Document).all()
    return results

@app.get("/questions/{document_id}")
async def get_all_questions(document_id: int):
    db = SessionLocal()
    result = db.query(Document).filter(Document.id == document_id).first()
    return result

@app.get("/annotations/{document_id}")
async def get_all_annotations(document_id: int):
    db = SessionLocal()
    result = db.query(Document).filter(Document.id == document_id).first()
    return result

@app.get("/entities/{document_id}")
def get_document_entities(document_id: int):
    with GraphDatabase.driver(uri, auth=(username, password)) as driver:
        with driver.session() as session:
            query = (
                f"MATCH (d:Word {{document_id: {document_id}}})-[:HAS_TAG]->(t:Tag) "
                "RETURN d.word AS word, t.tag AS tag"
            )
            result = session.run(query)
            return result.data()

@app.put("/questions/{document_id}")
def update_questions(document_id: int, questions: Questions):
    try:
        db = SessionLocal()
        document = db.query(Document).filter(Document.id == document_id).first()
        if document:
            document.questions = json.loads(questions.json())
            db.commit()
        db.close()
        return JSONResponse(content={"message": "Questions updated successfully"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"message": "Questions update failed", "error": str(e)}, status_code=500)

@app.put("/annotations/{document_id}")
def update_annotations(document_id: int, annotations: Annotations):
    try:
        db = SessionLocal()
        document = db.query(Document).filter(Document.id == document_id).first()
        if document:
            document.annotations = json.loads(annotations.json())
            db.commit()
        db.close()
        return JSONResponse(content={"message": "Annotations updated successfully"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"message": "Annotations update failed", "error": str(e)}, status_code=500)


@app.post("/import-document")
async def import_document(document: UploadFile):
    try:
        # Specify the Minio bucket where you want to store the uploaded files
        minio_bucket = "documents"
        guid = uuid.uuid4()
        file_extension = os.path.splitext(document.filename)[-1]
        minio_object_name = f"{guid}{file_extension}"
        file_size = os.fstat(document.file.fileno()).st_size

        if not minio_client.bucket_exists(minio_bucket):
            minio_client.make_bucket(minio_bucket)

        # Use Minio's put_object method to upload the file
        minio_client.put_object(
            minio_bucket,
            minio_object_name,
            document.file,
            file_size,
        )

        db = SessionLocal()
        document.file.seek(0)
        content = await document.read(1024)
        content = content.decode()
        entities = preprocess(content)

        new_document = Document(
            location_path=minio_bucket+"/"+minio_object_name,
            content=content,
            questions=[],
            annotations=[],
            entities=entities)
        db.add(new_document)
        db.commit()
        db.refresh(new_document)

        with GraphDatabase.driver(uri, auth=(username, password)) as driver:
            with driver.session() as session:
                for word, tag in entities:
                    # Store each word and its corresponding POS tag in the Neo4j database
                    session.write_transaction(store_word_and_tag, word, tag, new_document.id)

        return JSONResponse(content={"message": "File uploaded to Minio successfully"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"message": "File upload to Minio failed", "error": str(e)}, status_code=500)