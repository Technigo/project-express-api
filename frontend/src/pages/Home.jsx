import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { SearchResultsList } from '../components/SearchResultsList';
import styled from 'styled-components';
import { Header } from '../components/Header';

const HomePage = styled.section`
  background-color: #eee;
  height: 100vh;
  width: 100vh;

  .search-bar-container {
    padding-top: 20vh;
    width: 40%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 200px;
  }
`;

export const Home = () => {

  const [results, setResults] = useState([]);

  return (
    <HomePage>
      <Header />
    </HomePage>
  );
};


