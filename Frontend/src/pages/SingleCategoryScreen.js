import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useParams, Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import netflix, { generateCategories } from '../reducers/netflix';
import { Card } from '../components/Card';
import { SubHeader } from '../components/SubHeader';
import genreArray from '../data/genreArray.json';
import countryArray from '../data/countryArray.json';

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

export const SingleCategoryScreen = (path) => {
  const dispatch = useDispatch();
  const items = useSelector((store) => store.netflix.items);
  const { category } = useParams();
  const title = path.match.params.singleCategory;
  const media = path.match.params.type;
  const match = useRouteMatch();

  useEffect(() => {
    dispatch(netflix.actions.setCategory(category));
    dispatch(generateCategories(media, title));
  }, [category, dispatch, media, title]);

  const onMoreContent = () => {};
  return (
    <Section>
      <SubHeader title={title} btnText="Next Page" handleClick={onMoreContent} />
      <Grid>
        {items.map((item, i) => (
          <ItemLink key={i} to={`${match.url}/${title}`}>
            <Card
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
