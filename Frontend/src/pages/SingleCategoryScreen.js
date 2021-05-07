import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useParams, Link, useRouteMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import netflix, { generateCategories } from '../reducers/netflix';
import { CardList } from '../components/CardList';
import { SubHeader } from '../components/SubHeader';
import genreArray from '../data/genreArray.json';
import countryArray from '../data/countryArray.json';
import { NavButton } from '../components/NavButton'

const Section = styled.section`
  width: calc(100vw - 30px);
  @media (min-width: 1024px) {
    width: 1024px;
  }
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ItemLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
`;

export const SingleCategoryScreen = () => {
  const dispatch = useDispatch();
  const filters = useSelector((store) => store.netflix.filters);
  const items = useSelector((store) => store.netflix.items)
  const { category } = useParams();
  const title = filters.singleCategory

  useEffect(() => {
    dispatch(netflix.actions.setCategory(category));
    dispatch(generateCategories());
  }, [category, dispatch]);

  return (
    <Section>
      <SubHeader title={title} />
      <Grid>
        {items.map((item, i) => (
          <ItemLink key={i} to={`/title/${item.title}`} >
            <CardList
              {...item}
              i={i}
              color={
                category === 'genre'
                  ? genreArray[genreArray.findIndex((arr) => arr.name === title)].color
                  : countryArray[countryArray.findIndex((arr) => arr.name === title)].color
              } />
          </ItemLink>
        ))}
      </Grid>
    </Section>
  );
};
