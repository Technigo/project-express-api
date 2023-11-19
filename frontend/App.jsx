import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Pobierz dane z twojego API
    axios.get('http://localhost:8080/sales')
      .then(response => setSalesData(response.data))
      .catch(error => console.error('Błąd pobierania danych:', error));
  }, []);

  return (
    <div>
      <h1>Wyniki Sprzedaży Awokado</h1>
      <ul>
        {salesData.map(sale => (
          <li key={sale.id}>
            <strong>ID:</strong> {sale.id}, <strong>Data:</strong> {sale.date}, <strong>Średnia Cena:</strong> {sale.averagePrice}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
