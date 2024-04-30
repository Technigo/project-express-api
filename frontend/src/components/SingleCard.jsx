import styled from 'styled-components'
import { Link } from 'react-router-dom'

/* eslint-disable react/prop-types */
const StyledCard = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 10px;
  flex-direction: column;

  .content {
    padding: 20px;
    color: black;
  }
  img {
    object-fit: cover;
    width: 90vw;
    border-radius: 20px;
    height: 300px;
    transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;

    &:hover {
      transform: scale(1.02);
      filter: brightness(70%);
    }
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
export const SingleCard = ({
  price,
  roomType,
  name,
  neighbourhood,
  accommodationId,
  image,
}) => {
  return (
    <Link to={`accommodations/${accommodationId}`}>
      <StyledCard>
        <img src={image} alt="accommodation-image" />
        <div className="content">
          <h2>{name}</h2>
          <h5>{neighbourhood}</h5>
          <p>{roomType}</p>
          <span>From {price} CHF</span>
        </div>
      </StyledCard>
    </Link>
  )
}
