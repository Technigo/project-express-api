import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const Summary = () => {
  const accommodationId = useParams()

  const [accommodationDetails, setAccommodationDetails] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!accommodationId) return // Make sure accommodationId is available

    setLoading(true)
    fetch(
      `https://project-express-api-7pjc.onrender.com/accommodations/${accommodationId}`
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
  }, [accommodationId])

  if (loading) return <div>Loading...</div>
  if (!accommodationDetails) return <div>No accommodation details found.</div>

  return (
    <>
      <img src="/new-york.jpg" alt="new-york" />
      <div className="content">
        <h2>{accommodationDetails.name}</h2>
        <h5>{accommodationDetails.neighbourhood}</h5>
        <div className="host">
          <img src="/host-icon.png" alt="host-icon" />
          <p>{accommodationDetails.host_name}</p>
        </div>
        <div className="USP">
          <img src="/star-icon.png" alt="star" />
          <span>High rating</span>
        </div>
        <div className="USP">
          <img src="/agenda-icon.png" alt="calendar" />
          <span>Flexible dates</span>
        </div>
      </div>
    </>
  )
}
