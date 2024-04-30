import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import { createGlobalStyle } from 'styled-components'
import { AppProvider } from './context/AppStore'

const GlobalStyles = createGlobalStyle`
  /* Reset styles */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Set global font styles */
  body {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    background-color: #f0f0f0;
  }

 

  
 
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  h2{
    font-size:15px;
  }

  p {
    font-size: 16px;
    margin-bottom: 15px;
  }

  button {
    font-size: 16px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  
  
  .icon {
    font-size: 20px;
    margin-right: 10px;
  }

  
  @media (min-width: 768px) {
    h1 {
      font-size: 32px;
    }


    p {
      font-size: 18px;
    }

    button {
      font-size: 18px;
    }

    .icon {
      font-size: 24px;
    }
  }
`

export const App = () => {
  return (
    <AppProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
