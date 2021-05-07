import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro';

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
  return (
    <Start>
      <MainTitle>NETFLIX</MainTitle>
      <NavLink to="/type/tvshows">
        <Container>
          <Title>TV SERIES</Title>
        </Container>
      </NavLink>
      <NavLink to="/type/movies">
        <Container>
          <Title>MOVIES</Title>
        </Container>
      </NavLink>
    </Start>
  );
};
