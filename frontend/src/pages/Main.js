import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Loading from '../components/Loading'
import TopMenu from '../components/TopMenu'
import Bookshelf from './Bookshelf'
import Bookview from './Bookview'

const MainContainer = styled.div``

const Main = () => {
  const isLoading = useSelector((state) => state.ui.loading)
  return (
    <MainContainer>
      {isLoading
        ? <Loading />
        : (
          <BrowserRouter>
            <TopMenu />
            <Routes>
              <Route path="/" element={<Bookshelf />} />
              <Route path="/books/author/:author" element={<Bookshelf />} />
              <Route path="/book/:bookId" element={<Bookview />} />
            </Routes>
          </BrowserRouter>)}
    </MainContainer>
  )
}

export default Main;