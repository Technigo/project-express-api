import React, { useState, useEffect } from 'react';

export const PokemonStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('https://project-express-api-19k5.onrender.com')
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((error) => console.log(error))
  }, []);

  if (stats === null) {
    return <div>Loading data...</div>;
  }

  return (
    <div>
      <p>Name: {stats.name}</p>
      <p>Height: {stats.height}</p>
      <p>Weight: {stats.weight}</p>
    </div>
  );
}
