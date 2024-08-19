FROM python:3.11-slim

WORKDIR /App

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

RUN pip install fastapi uvicorn

COPY ./App /App

#ENV DB="sqlite:///./filmesdb.db"
ENV DB="sqlite:///App/db/filmesdb.db"
ENV PYTHONPATH=/App

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0","--reload"]