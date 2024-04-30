import styled from 'styled-components'
import { useAppContext } from '../context/AppStore'

const SearchBarSection = styled.section`
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  padding: 20px;
`

const SearchBarContainer = styled.form`
  display: flex;
  align-items: center;
  border: 2px solid #e0e0e0;
  border-radius: 30px;
  background-color: white;
  padding: 5px;
  width: fit-content;
  @media (min-width: 669px) and (max-width: 1024px) {
    width: 100%;
  }

  @media (min-width: 1024px) {
    width: 100%;
  }
`

const SearchInput = styled.input`
  padding: 10px 0;
  background-color: white;
  flex-grow: 2;
  color: #000000a7;
  border: none;
  font-size: 16px;
  outline: none;
  padding-left: 40px;
  background-image: url(/search-icon.svg);
  background-repeat: no-repeat;
  background-position: 10px center;
  border-radius: 30px;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: #bdbdbd;
  }

  &:focus {
    border-color: #ff5a5f;
  }
`

const SearchButton = styled.button`
  flex-shrink: 0;
  background-color: #ff5a5f;
  border: none;
  border-radius: 30px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  outline: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0484e;
  }
`

export const SearchBar = () => {
  const { handleSearch, setSearchTerm, searchTerm } = useAppContext()

  return (
    <SearchBarSection>
      <SearchBarContainer onSubmit={handleSearch}>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton type="submit">→</SearchButton>
      </SearchBarContainer>
    </SearchBarSection>
  )
}
