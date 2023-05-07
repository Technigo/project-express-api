import React, { useState, useEffect } from 'react';


const QuoteList = () => {
  const [quoteList, setQuoteList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080')
      .then((res) => res.json())
      .then((json) => setQuoteList(json));
  }, []);

  return (
    <div>
      <h1>This is the quote list component!</h1>
      <ul>
        {quoteList.map((quote, index) => (
          <li key={index}>{quote.sentence}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuoteList;