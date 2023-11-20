import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const LaureateItem = styled.div`
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 16px;
  transition: transform 0.3s ease-in-out;
  width: 100%; 
  height: auto; 

  &:hover {
    transform: translateY(-4px);
  }
`;

export function LaureateCard({ laureate }) {
  return (
    <CardLink to={`/category/${laureate.category}`}>
      <LaureateItem>
        <h1>{laureate.fullName}</h1>
        <p>{laureate.year}</p>
        <p>Motivation: {laureate.motivation}</p>
      </LaureateItem>
    </CardLink>
  );
}
