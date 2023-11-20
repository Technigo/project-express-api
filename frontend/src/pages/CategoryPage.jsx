import { useState, useEffect } from 'react';
import { getLaureates } from '../apiFetch';
import { LaureateCard } from '../components/LaureateCard';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '../components/Header';

const LaureateList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 0 auto;
  padding: 20px 20px;
  max-width: 1200px;
  justify-content: center; 

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet layout */
    padding: 20px 20px; 
  }
`;
const BackButton = styled(Link)`
  display: block;
  margin: 20px auto; 
  padding: 10px 20px;
  color: #fff;
  background-color: #007bff;
  text-decoration: none;
  text-align: center;
  border-radius: 5px;
  width: fit-content; 

  &:hover {
    background-color: #0056b3;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 1.2em;
  color: #555;
`;

export const CategoryPage = () => {
  const { category } = useParams();
  const [laureates, setLaureates] = useState([]);
  const [loading, setLoading] = useState(true); // Introduce loading state

  useEffect(() => {
    const fetchLaureates = async () => {
      try {
        const laureateList = await getLaureates(category);
        setLaureates(laureateList);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log('Error fetching laureates: ', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };
    fetchLaureates();
  }, [category]);

  return (
    <>
      <Header />
      <BackButton to="/">Go Back</BackButton>
      {loading ? ( // Conditional rendering based on loading state 
        <LoadingMessage>Loading...</LoadingMessage>
      ) : (
        <LaureateList>
          {laureates.map((laureate, index) => (
            <LaureateCard key={index} laureate={laureate} />
          ))}
        </LaureateList>
      )}
    </>
  );
};