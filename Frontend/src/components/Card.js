import React from "react";
import styled from "styled-components/macro";
import { useSelector } from 'react-redux'

import { SubHeader} from "../components/SubHeader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 30px);
  margin: 5px;
  background: ${(props) => props.color};
  padding: 10px;
  max-width: 500px;
`;

const Description = styled.p`
  font-size: 16px;
  color: white;
`;

const Cast = styled.p`
  font-size: 16px;
  color: white;
`;

const Director = styled.p`
  font-size: 16px;
  color: white;
`;

const Released = styled.p`
  font-size: 16px;
  color: white;
`;

const Duration = styled.p`
  font-size: 16px;
  color: white;
`;

const Bold = styled.span`
  font-size: 16px;
  color: white;
  font-weight: 600;
`;

export const Card = () => {
  const item = useSelector(store => store.netflix.currentItem)

  console.log(item)
  return (
    <Container color={item.color}>
      <SubHeader title={item.title} />
      <Duration>{item.duration}</Duration>
      <Released>
        <Bold>Released:</Bold> {item.release_year}, {item.country}{" "}
      </Released>
      <Description>{item.description}</Description>
      <Director>
        <Bold>Director:</Bold> {item.director}
      </Director>
      <Cast>
        <Bold>Cast: </Bold>
        {item.cast}
      </Cast>
    </Container>
  );
};
