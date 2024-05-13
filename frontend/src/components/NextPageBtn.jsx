import styled from 'styled-components'
import { LeftArrow } from './LeftArrow'
import { RightArrow } from './RightArrow'
import { useAppContext } from '../context/AppStore'

export const NextPageBtn = () => {
  const { nextPage, previousPage, currentPage } = useAppContext()
  const StyledNavigation = styled.div`
    padding: 40px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 100%;
    button {
      background-color: #f0f0f0;
      border: 2px solid #e0e0e0;
      border-radius: 50px;
      &:hover {
        background-color: #e0484e;
      }
      &:hover svg path {
        fill: white;
      }
    }
  `
  return (
    // render buttons conditionally
    <StyledNavigation>
      {currentPage !== 1 && (
        <button onClick={previousPage}>
          <LeftArrow />
        </button>
      )}
      <p>Page {currentPage}</p>
      {currentPage !== 5 && (
        <button onClick={nextPage}>
          <RightArrow />
        </button>
      )}
    </StyledNavigation>
  )
}
