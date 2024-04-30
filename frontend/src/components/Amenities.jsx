import styled from 'styled-components'

/* eslint-disable react/prop-types */
const StyledLi = styled.li`
  border-bottom: 1px solid #e0e0e0;
  margin-top: 10px;
`

export const Amenities = ({ amenities }) => {
  return (
    <>
      {amenities.length !== 0 && (
        <>
          <h2>Amenities</h2>
          <ul>
            {amenities.map((item, index) => (
              <StyledLi key={index}>{item}</StyledLi>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
