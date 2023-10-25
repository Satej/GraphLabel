from pydantic import BaseModel
from typing import List

# Pydantic model for incoming data
class Question(BaseModel):
    text: str

# Pydantic model for a list of questions
class Questions(BaseModel):
    questions: List[Question]

# Pydantic model for incoming data
class Annotation(BaseModel):
    startIndex: int
    endIndex: int
    label: str
    color: str
    text: str

# Pydantic model for a list of questions
class Annotations(BaseModel):
    annotations: List[Annotation]