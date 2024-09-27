import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MovieCard = styled.div`
  border: 1px solid #ccc;
  margin: 1rem;
  padding: 1rem;
  border-radius: 8px;
  width: 200px;
`;

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Ensure this matches the endpoint provided by your Express server
    fetch('http://localhost:8080/titles') 
      .then(response => response.json())
      .then(data => setMovies(data));
  }, []);

  return (
    <div className="App">
      <h1>Movie List</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '16px' }}>
        {movies.map(movie => (
          <MovieCard key={movie.show_id}>
            <h2>{movie.title} ({movie.release_year})</h2>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Cast:</strong> {movie.cast}</p>
            <p><strong>Country:</strong> {movie.country}</p>
            <p><strong>Added:</strong> {movie.date_added}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Duration:</strong> {movie.duration}</p>
            <p><strong>Categories:</strong> {movie.listed_in}</p>
            <p><strong>Description:</strong> {movie.description}</p>
          </MovieCard>
        ))}
      </div>
    </div>
  );
}

export default App;

