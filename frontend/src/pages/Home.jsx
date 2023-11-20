import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Header } from '../components/Header';
import styled from 'styled-components';

const HomePage = styled.section`
  .category-buttons {
    display: flex;
    flex-direction: column; 
    align-items: center; 

    button {
      margin-bottom: 20px; 
      padding: 12px 20px; 
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      width: fit-content;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  @media screen and (min-width: 768px) {
    /* Tablet layout and above: Change button layout */
    .category-buttons {
      flex-direction: row; 
      justify-content: center; 
      flex-wrap: wrap; 

      button {
        margin: 0 5px 10px; 
      }
    }
  }
`;



export const Home = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate(`/category/${category}`);
  };

  return (
    <HomePage>
      <Header />
      <div className="category-buttons">
        <button onClick={() => handleCategoryClick('physics')}>
          Physics
        </button>
        <button onClick={() => handleCategoryClick('peace')}>
          Peace
        </button>
        <button onClick={() => handleCategoryClick('economics')}>
          Economic Sciences
        </button>
        <button onClick={() => handleCategoryClick('medicine')}>
          Physiology or Medicine
        </button>
        <button onClick={() => handleCategoryClick('literature')}>
          Literature
        </button>
      </div>
    </HomePage>
  );
};
