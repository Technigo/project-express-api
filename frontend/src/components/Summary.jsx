import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Amenities } from './Amenities'
import styled from 'styled-components'

const StyledSummary = styled.div`
  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    border-bottom: 1px solid #e0e0e0;
    font-size: 1rem;
    margin-bottom: 10px;
  }

  h5 {
    font-size: 1rem;
    margin-bottom: 10px;
  }

  .host {
    display: flex;
    margin-bottom: 10px;
    justify-content: center;
    align-items: flex-end;
    img {
      width: 30px;
      height: 30px;
    }
    span {
      font-size: 0.9rem;
      padding-left: 20px;
      white-space: nowrap;
    }
  }

  .USP {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    align-items: center;

    img {
      width: 30px;
      height: 30px;
    }
    span {
      font-size: 0.9rem;
      padding-left: 20px;
    }
  }
  .containerUsp {
    display: flex;
    gap: 15px;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #e0e0e0;
  }

  display: flex;
  box-sizing: border-box;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  .content {
    padding: 20px;
    color: black;
  }
  .mainpic {
    object-fit: cover;
    width: 90vw;
    border-radius: 20px;
    height: 300px;
  }
  @media (min-width: 669px) and (max-width: 1024px) {
    .mainpic {
      width: 40vw;
      object-fit: cover;
      border-radius: 20px;
      height: auto;
    }
  }

  @media (min-width: 1024px) {
    .mainpic {
      width: 30vw;
      object-fit: cover;
      border-radius: 20px;
      height: auto;
    }
  }
`

export const Summary = () => {
  const { accommodation } = useParams()

  const [accommodationDetails, setAccommodationDetails] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!accommodation) return // Make sure accommodationId is available
    console.log(accommodation)
    setLoading(true)
    fetch(
      `https://project-express-api-7pjc.onrender.com/accommodations/${accommodation}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setAccommodationDetails(data)

        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching accommodation details:', error)
        setLoading(false)
      })
  }, [accommodation])

  if (loading) return <div>Loading...</div>
  if (!accommodationDetails) return <div>No accommodation details found.</div>

  return (
    <StyledSummary>
      <img
        src={accommodationDetails.image}
        alt="accommodation-image"
        className="mainpic"
      />

      <div className="content">
        <h2>{accommodationDetails.name}</h2>
        <p>{accommodationDetails.description}</p>
        <h5>{accommodationDetails.neighbourhood}</h5>
        <div className="containerUsp">
          <div className="host">
            <img src="/host-icon.png" alt="host-icon" />
            <span> Host: {accommodationDetails.host_name}</span>
          </div>
          <div className="USP">
            <img src="/star-icon.png" alt="star" />

            <span>{accommodationDetails.rating}</span>
          </div>
        </div>
        <Amenities amenities={accommodationDetails.amenities} />
      </div>
    </StyledSummary>
  )
}
