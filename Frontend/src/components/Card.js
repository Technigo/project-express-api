import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 30px);
  margin: 5px;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.color};
  padding: 10px;
`;

const Title = styled.h2`
font-size: 18px;`

const Text = styled.p`
font-size: 16px;`

export const Card = ({ color, title, description }) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Text>{description}</Text>
    </Container>
  )
};
