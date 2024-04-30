import styled from 'styled-components'

/* eslint-disable react/prop-types */
const StyledCard = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 10px;
  flex-direction: column;
  /* align-items: center; */
  .content {
    padding: 20px;
  }
  img {
    object-fit: cover;
    width: 90vw;
    border-radius: 20px;
    height: 300px;
  }
  @media (min-width: 669px) and (max-width: 1024px) {
    img {
      width: 40vw;
      object-fit: cover;
      border-radius: 20px;
      height: auto;
    }
  }

  @media (min-width: 1024px) {
    img {
      width: 30vw;
      object-fit: cover;
      border-radius: 20px;
      height: auto;
    }
  }
`
export const SingleCard = ({ price, roomType, name, neighbourhood }) => {
  return (
    <StyledCard>
      <img src="/new-york.jpg" alt="new-york" />
      <div className="content">
        <h2>{name.toUpperCase()}</h2>
        <h5>{neighbourhood}</h5>
        <p>{roomType}</p>
        <span>From {price} CHF</span>
      </div>
    </StyledCard>
  )
}
