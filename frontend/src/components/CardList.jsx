import { useAppContext } from '../context/AppStore'
import styled from 'styled-components'
import { SingleCard } from './SingleCard'
import Loading from '/loading.gif'
import { NextPageBtn } from './NextPageBtn'
import NoResult from '/no-result.png'

const StyledContainer = styled.main`
  display: flex;

  flex-direction: column;
  padding: 32px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  @media (min-width: 669px) and (max-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .containerResult {
      grid-column: 1 / span 2;
      justify-self: center;
    }
  }

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    .containerResult {
      grid-column: 2 / span 1;
      justify-self: center;
    }
  }

  .loadingGif {
    object-fit: contain;
    width: 250px;
    height: 100vh;
    position: absolute;
    top: 30%;
    right: 50%;
    left: auto;
  }
  .noResult {
    object-fit: contain;
    width: 250px;
  }
  .containerResult {
    text-align: center;
  }
`

export const CardList = () => {
  const { accommodations, loading, searchResults, searchTerm } = useAppContext()
  if (loading)
    return (
      <StyledContainer>
        <img className="loadingGif" src={Loading} alt="loading-gif" />
      </StyledContainer>
    )

  return (
    <>
      <StyledContainer>
        {searchTerm !== '' && searchResults.length === 0 ? (
          <div className="containerResult">
            <img className="noResult" src={NoResult} alt="no-results-found" />
            <h2>
              We couldn&apos;t find any result. I&apos;m sorry, please try
              searching for something else.
            </h2>
          </div>
        ) : (
          <>
            {searchTerm !== ''
              ? searchResults.map((accommodation) => (
                  <SingleCard key={accommodation.id} {...accommodation} />
                ))
              : accommodations.map((accommodation) => (
                  <SingleCard key={accommodation.id} {...accommodation} />
                ))}
          </>
        )}
      </StyledContainer>
      <NextPageBtn />
    </>
  )
}
