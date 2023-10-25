FROM python:3.10
WORKDIR /app
COPY ./requirements.txt /app
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN python -m spacy download en_core_web_sm
EXPOSE 8000
RUN mkdir -p /usr/local/nltk_data
WORKDIR /app
COPY ./main.py ./model.py ./schema.py ./__init__.py /app/
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
