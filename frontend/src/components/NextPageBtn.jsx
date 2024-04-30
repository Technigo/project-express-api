import styled from 'styled-components'
import { LeftArrow } from './LeftArrow'
import { RightArrow } from './RightArrow'

export const NextPageBtn = () => {
  const StyledNavigation = styled.div`
    padding: 40px 0;
    display: flex;
    justify-content: center;
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
    <StyledNavigation>
      <button>
        <LeftArrow />
      </button>
      <button>
        <RightArrow />
      </button>
    </StyledNavigation>
  )
}
