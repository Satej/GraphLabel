from sqlalchemy import Column, Integer, String, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base

# Define a SQLAlchemy model for your table
Base = declarative_base()

class Document(Base):
    __tablename__ = 'documents'

    id = Column(Integer, primary_key=True, index=True)
    location_path = Column(String, nullable=False)
    content = Column(String, nullable=False)
    create_date = Column(DateTime, nullable=False, server_default='now()')
    entities = Column(JSON, nullable=True)
    questions = Column(JSON, nullable=True)
    annotations = Column(JSON, nullable=True)
    
