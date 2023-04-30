import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components'
import TopMenu from '../components/TopMenu'
import Bookshelf from './Bookshelf'
import Bookview from './Bookview'

const MainContainer = styled.div``

const Main = () => {
  return (
    <BrowserRouter>
      <MainContainer>
        <TopMenu />
        <Routes>
          <Route path="/" element={<Bookshelf />} />
          <Route path="/book/:bookId" element={<Bookview />} />
          <Route path="/random" element={<Bookview random />} />
        </Routes>
      </MainContainer>
    </BrowserRouter>
  );
}

export default Main;