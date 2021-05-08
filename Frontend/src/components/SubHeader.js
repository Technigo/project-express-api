import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import netflix from '../reducers/netflix'
import { NavButton } from './NavButton';

const HeaderContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  background: black;
  padding: 50px 10px;
  color: white;
  font-weight: 600;
  align-self: flex-start;
  justify-content:space-between;
  align-items: center;

@media (min-width: 768px) {
  width: 100%;
  align-items: flex-start;
 
}
`;

const Title = styled.h1`
  margin: 0;
  display: inline-block;
  width: 100%;
  text-align: center;
  margin: 20px 0;

  @media (min-width: 1024px) {
  
}

`;

export const SubHeader = ({ title }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const page = useSelector((store) => store.netflix.filters.page)

  const onGoingBack = () => {
    // eslint-disable-next-line no-unused-expressions
    page > 0 && dispatch(netflix.actions.setPage((page - 1)))
    history.goBack()
  }

  return (
    <HeaderContainer>
      <NavButton content="< Back" handleClick={onGoingBack} />
      <Title>{title.charAt(0).toUpperCase() + title.slice(1)}</Title>
    </HeaderContainer>
  );
};
