from sqlalchemy.orm import Session
from models import Filme
from schemas import FilmeCreate

def get_filmes(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Filme).offset(skip).limit(limit).all()

def create_filme(db: Session, filme: FilmeCreate):
    db_filme = Filme(titulo=filme.titulo, descricao=filme.descricao)
    db.add(db_filme)
    db.commit()
    db.refresh(db_filme)
    return db_filme

def delete_filme(db: Session, filme_id: int):
    db_filme = db.query(Filme).filter(Filme.id == filme_id).first()
    if db_filme:
        db.delete(db_filme)
        db.commit()
        return True
    return False