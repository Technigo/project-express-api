import styled from 'styled-components'

/* eslint-disable react/prop-types */
const StyledSvg = styled.svg`
  width: 30px;
  height: 30px;
`

export const RightArrow = ({ fill = '#ff5a5f' }) => {
  return (
    <StyledSvg
      width="800px"
      height="800px"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g data-name="arrow right" id="arrow_right">
        <path
          d="M10.05,29.73a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42L20.66,16.71a1,1,0,0,0,0-1.42L9.34,4a1,1,0,0,1,1.42-1.42L22.07,13.88a3,3,0,0,1,0,4.24L10.76,29.44A1,1,0,0,1,10.05,29.73Z"
          fill={fill}
        />
      </g>
    </StyledSvg>
  )
}
