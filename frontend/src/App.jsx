import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import { createGlobalStyle } from 'styled-components'
import { AppProvider } from './context/AppStore'
import { Summary } from './components/Summary'

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
  a{
    text-decoration: none;
  }
 
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  h2{
    font-size:20px;
  }
  h5{
    font-size: 18px;
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
ul,li{
  text-decoration: none;
  list-style: none;
}
  
  
  .icon {
    font-size: 20px;
    margin-right: 10px;
  }

  
  @media (min-width: 768px) {
    h1 {
      font-size: 32px;
    }

h2{
  font-size: 24px;
}
    p {
      font-size: 20px;
    }

    button {
      font-size: 18px;
    }
    h5{
      font-size: 20px;
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
          <Route path="accommodations/:accommodation" element={<Summary />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
