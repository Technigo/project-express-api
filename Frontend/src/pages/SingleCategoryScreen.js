import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import netflix, { generateCategories } from '../reducers/netflix';
import { CardList } from '../components/CardList';
import { SubHeader } from '../components/SubHeader';
import { NavButton } from '../components/NavButton'
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

const Error = styled.div`
display: flex;
width: 100%;
justify-content: center;
`
const ErrorText = styled.h1`
color: white;`

export const SingleCategoryScreen = () => {
  const dispatch = useDispatch();
  const { media, page, singleCategory } = useSelector(
    (store) => store.netflix.filters
  );
  const items = useSelector((store) => store.netflix.items);
  const error = useSelector((store) => store.netflix.error);
  const { category } = useParams();

  console.log(category);
  useEffect(() => {
    dispatch(netflix.actions.setCategory(category));
    dispatch(generateCategories());
  }, [category, dispatch, page]);

  return (
    <Section>
      <SubHeader title={singleCategory} />
      {error !== '' ? (
        <Error> <ErrorText> No more objects found <span role="img" aria-label="icon">😔</span> </ErrorText></Error>
      ) : (
        <>
          <Link
            to={`/type/${media}/${category}/${singleCategory}/page/${page + 1}`}>
            <NavButton
              content="Next Page >"
              handleClick={() => dispatch(netflix.actions.setPage(page + 1))} />
          </Link>
          <Grid>
            {items.map((item, i) => (
              <ItemLink key={i} to={`/title/${item.title}`}>
                <CardList
                  {...item}
                  i={i}
                  color={
                    category === 'genre'
                      ? genreArray[genreArray.findIndex((arr) => arr.name === singleCategory)].color
                      : countryArray[countryArray.findIndex((arr) => arr.name === singleCategory)].color
                  } />
              </ItemLink>
            ))}
          </Grid>
        </>
      )}
    </Section>
  );
};
