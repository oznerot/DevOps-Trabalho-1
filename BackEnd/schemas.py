from pydantic import BaseModel

class FilmeBase(BaseModel):
    titulo: str
    descricao: str

class FilmeCreate(FilmeBase):
    pass

class Filme(FilmeBase):
    id: int

    class Config:
        orm_mode = True