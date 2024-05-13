import styled from 'styled-components'
import { SearchBar } from './SearchBar'
import Logo from '/logo-hotel.svg'

const StyledHeader = styled.header`
  padding: 0 30px;
  margin-top: 20px;
  display: grid;
  align-content: center;
  justify-content: center;
  justify-items: center;
  align-items: center;
  .logo {
    width: 50px;
    height: 50px;
  }

  @media (min-width: 669px) and (max-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 5fr;
    padding: 0 40px;
  }
  .logo {
    width: 54px;
    height: 54px;
  }

  @media (min-width: 1024px) {
    display: grid;

    grid-template-columns: 1fr 5fr;
    padding: 0 70px;

    justify-items: center;
    .logo {
      width: 60px;
      height: 60px;
    }
  }
`
export const Header = () => {
  return (
    <StyledHeader>
      <img src={Logo} alt="logo-hotel" className="logo" />
      <SearchBar />
    </StyledHeader>
  )
}
