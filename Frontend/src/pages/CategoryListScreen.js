import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import styled from 'styled-components/macro';

import { SubHeader } from '../components/SubHeader';
import { Card } from '../components/Card';
import genreArray from '../data/genreArray.json';
import countryArray from '../data/countryArray.json';

const Category = styled.section`
  width: calc(100vw - 30px);
  @media (min-width: 1024px) {
    width: 1024px;
  }
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-auto-rows: 200px;
  grid-template-columns: 1fr;
  margin-bottom: 50px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CategoryLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
`;

export const CategoryListScreen = () => {
  const match = useRouteMatch();

  const handleCategories = (name, array) => {
    return (
      <>
        <SubHeader title={name} btnText="More" />
        <Grid>
          {array.map((item) => (
            <CategoryLink
              key={item.name}
              to={{
                pathname: `${match.url}/${name}/${item.name}`,
                params: { path: item.name }
              }}>
              <Card color={item.color} title={item.display} description="" />
            </CategoryLink>
          ))}
        </Grid>
      </>
    );
  };

  return (
    <Category>
      {handleCategories('genre', genreArray)}
      {handleCategories('country', countryArray)}
    </Category>
  );
};
