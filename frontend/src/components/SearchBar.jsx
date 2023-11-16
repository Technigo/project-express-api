import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styled from 'styled-components';

const InputWrapper = styled.div`
  background-color: white;
  width: 50%;
  border-radius: 10px;
  height: 2.5rem;
  padding: 0 15px;
  box-shadow: 0px 0px 8px #ddd;
  display: flex;
  align-items: center;

  input {
    background-color: transparent;
    border: none;
    height: 100%;
    font-size: 1.25rem;
    width: 50%;
    margin-left: 5px;
  }

  input:focus {
    outline: none;
  }

  #search-icon {
    color: royalblue;
  }
`;

export const SearchBar = () => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("https://nobel-prize-data.onrender.com/winners")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    });
  };

  return (
    <InputWrapper>
      <FaSearch id="search-icon" />
      <input placeholder="Type to search..." value={input} onChange={(e) => setInput(e.target.value)}/>
    </InputWrapper>
  )
};
