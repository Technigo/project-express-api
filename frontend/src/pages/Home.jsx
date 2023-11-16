import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { Results } from '../components/FilteredResults';
import styled from 'styled-components';

export const Home = () => {

  return (
    <>
      <div className='search-bar-container'>
        <SearchBar />
        <Results />
      </div>
    </>
  );
};


