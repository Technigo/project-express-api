/* eslint-disable react/prop-types */
import styled from 'styled-components'

const StyledSvg = styled.svg`
  width: 30px;
  height: 30px;
`

export const LeftArrow = ({ fill = '#ff5a5f' }) => {
  return (
    <StyledSvg
      width="800px"
      height="800px"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g data-name="arrow left" id="arrow_left">
        <path
          d="M22,29.73a1,1,0,0,1-.71-.29L9.93,18.12a3,3,0,0,1,0-4.24L21.24,2.56A1,1,0,1,1,22.66,4L11.34,15.29a1,1,0,0,0,0,1.42L22.66,28a1,1,0,0,1,0,1.42A1,1,0,0,1,22,29.73Z"
          fill={fill}
        />
      </g>
    </StyledSvg>
  )
}
