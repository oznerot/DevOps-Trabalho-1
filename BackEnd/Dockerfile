FROM python:3.11-slim

WORKDIR /App

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY ./App /App

ENV DB="sqlite:///./filmesdb.db"
ENV PYTHONPATH=/App

EXPOSE 8000

CMD ["uvicorn", "App.main:app", "--host", "0.0.0.0","--reload"]