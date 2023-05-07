import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import styled from 'styled-components'
import animationData from '../lotties/loading'

const LoaderContainer = styled.div`
  width: 200px;
  height: 410px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`
const Loading = () => {
  return (
    <LoaderContainer>
      <Player
        autoplay
        controls
        loop
        mode="normal"
        src={animationData}
        style={{ height: '200px', width: '150px' }} />
    </LoaderContainer>
  )
}

export default Loading;