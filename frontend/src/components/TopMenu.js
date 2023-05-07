import React from 'react'
import { Link } from 'react-router-dom/dist';
import styled from 'styled-components'

const StyledTopmenu = styled.div`
display: flex;
flex-direction: row;
gap: 15px;
justify-content: space-around;`

const TopMenu = () => {
  return (
    <StyledTopmenu>
      <Link key="1" to="/"><h1>bookshelf</h1></Link>
    </StyledTopmenu>
  );
}

export default TopMenu;