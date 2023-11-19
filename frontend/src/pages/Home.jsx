import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import styled from 'styled-components';

const HomePage = styled.section`
`;

export const Home = () => {
  
  return (
    <HomePage>
      <Header />
      <div className="category-buttons">
        {/* Create buttons for each category */}
        <Link to="/category/physics">
          <button>Physics</button>
        </Link>
        <Link to="/category/chemistry">
          <button>Chemistry</button>
        </Link>
        <Link to="/category/physiology-or-medicine">
          <button>Physiology or Medicine</button>
        </Link>
        <Link to="/category/literature">
          <button>Literature</button>
        </Link>
        <Link to="/category/peace">
          <button>Peace Prize</button>
        </Link>
        <Link to="/category/economic-sciences">
          <button>Economic Sciences</button>
        </Link>
      </div>
    </HomePage>
  );
};

