import React from 'react'
import styled from 'styled-components/macro'

const ButtonContainer = styled.div`
display: flex;
align-content: center;
width: fit-content;
`
const Button = styled.button`
background: transparent;
border: none;
cursor: pointer;`

const ButtonText = styled.span`
font-family: 'Montserrat', sans-serif;
color: white;
font-size: 20px;
margin-right: 20px;
font-weight: 300;`

export const NavButton = ({ content, handleClick }) => {
  return (
    <ButtonContainer onClick={handleClick}>
      <Button>
        <ButtonText>{content}</ButtonText>
      </Button>
    </ButtonContainer>
  )
}