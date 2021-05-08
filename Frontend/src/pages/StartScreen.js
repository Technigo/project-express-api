import React from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro';

import netflix from '../reducers/netflix'

const Start = styled.section`
display: flex;
flex-direction: column;
align-items: center;
width: 100vw;`;

const Container = styled.div`
height: 300px;
background: coral;
display: flex;
align-items: center;
justify-content: center;
margin: 20px;
`
const MainTitle = styled.h1`
color: white;
font-size: 35px;
`
const Title = styled.h2`
color: white;`

const NavLink = styled(Link)`
width: 500px;
max-width: 100vw;
text-decoration: none;
cursor: pointer;`

export const StartScreen = () => {
  const dispatch = useDispatch();

  const handleMedia = (name, type) => {
    return (
      <NavLink to={`/type/${type}`} onClick={() => dispatch(netflix.actions.setMedia(type))}>
        <Container>
          <Title>{name}</Title>
        </Container>
      </NavLink>
    )
  }

  return (
    <Start>
      <MainTitle> NETFLIX </MainTitle>
      {handleMedia('TV SHOWS', 'tvshows')}
      {handleMedia('MOVIES', 'movies')}
    </Start>
  );
};
