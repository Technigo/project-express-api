import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import netflix from '../reducers/netflix'
import { NavButton } from './NavButton';

const HeaderContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  background: black;
  padding: 50px 10px;
  color: white;
  font-weight: 600;
  align-self: flex-start;
  justify-content:space-between;
`;

const Title = styled.h1`
  margin: 0;
  display: inline-block;
  width: fit-content;
`;

export const SubHeader = ({ title }) => {
  const history = useHistory();
  return (
    <HeaderContainer>
      <NavButton content="< Back" handleClick={history.goBack} />
      <Title>{title.charAt(0).toUpperCase() + title.slice(1)}</Title>
    </HeaderContainer>
  );
};
