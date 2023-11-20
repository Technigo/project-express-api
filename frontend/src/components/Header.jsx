import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40px;

    img {
        width: 160px;
        height: 160px;
        margin: 20px;
    }
`;

export const Header = () => {

    return (
        <HeaderContainer>
            <img src="/nobel.svg" />
            <h1>Nobel Prize Catalog</h1>
        </HeaderContainer>
    )
}; 
