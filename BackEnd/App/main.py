from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from database import SessionLocal, engine, Base
import crud
import models
import schemas

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this as necessary to specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/filmes/", response_model=List[schemas.Filme])
def read_filmes(skip: int = 0, limit: int = 10, search: str = "", db: Session = Depends(get_db)):
    if search:
        filmes = db.query(models.Filme).filter(models.Filme.titulo.contains(search)).offset(skip).limit(limit).all()
    else:
        filmes = crud.get_filmes(db, skip=skip, limit=limit)
    return filmes


@app.post("/filmes/", response_model=schemas.Filme)
def add_filme(filme: schemas.FilmeCreate, db: Session = Depends(get_db)):
    return crud.create_filme(db=db, filme=filme)

@app.delete("/filmes/{filme_id}")
def delete_filme(filme_id: int, db: Session = Depends(get_db)):
    success = crud.delete_filme(db, filme_id)
    if not success:
        raise HTTPException(status_code=404, detail="Filme não encontrado")
    return {"detail": "Filme removido com sucesso"}

