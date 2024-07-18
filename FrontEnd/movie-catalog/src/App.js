import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    // Fetch all movies initially
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    axios.get('http://localhost:8000/filmes/')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching movies:', error));
  };

  const handleSearch = () => {
    if (searchTerm === '') {
      fetchMovies();
    } else {
      axios.get(`http://localhost:8000/filmes/?search=${searchTerm}`)
        .then(response => setMovies(response.data))
        .catch(error => console.error('Error fetching movies:', error));
    }
  };

  const handleAddMovie = () => {
    if (newTitle && newDescription) {
      axios.post('http://localhost:8000/filmes/', { titulo: newTitle, descricao: newDescription })
        .then(response => {
          setMovies([...movies, response.data]);
          setNewTitle('');
          setNewDescription('');
        })
        .catch(error => console.error('Error adding movie:', error));
    }
  };

  const handleDeleteMovie = (id) => {
    axios.delete(`http://localhost:8000/filmes/${id}`)
      .then(() => {
        setMovies(movies.filter(movie => movie.id !== id));
      })
      .catch(error => console.error('Error deleting movie:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Catálogo de Filmes</h1>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Digite o título do filme"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="mt-2 bg-blue-500 text-white p-2"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Adicionar Novo Filme</h2>
        <input
          type="text"
          className="border p-2 w-full mb-2"
          placeholder="Título"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 w-full mb-2"
          placeholder="Descrição"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button
          className="bg-green-500 text-white p-2"
          onClick={handleAddMovie}
        >
          Adicionar Filme
        </button>
      </div>
      <div>
        {movies.map(movie => (
          <div key={movie.id} className="border-b p-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{movie.titulo}</h2>
              <p>{movie.descricao}</p>
            </div>
            <button
              className="bg-red-500 text-white p-2"
              onClick={() => handleDeleteMovie(movie.id)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
