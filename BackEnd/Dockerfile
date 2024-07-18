FROM python:3.11-slim

WORKDIR /App

COPY . /App

ENV DB="sqlite:///./filmesdb.db"

EXPOSE 8000

RUN pip install -r requirements.txt

COPY init_db.sh /App/init_db.sh
RUN chmod +x /App/init_db.sh

CMD ["uvicorn", "main:app", "--host", "0.0.0.0","--reload"]