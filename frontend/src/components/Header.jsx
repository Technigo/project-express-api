import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`

    img {
        width: 160px;
        height: 160px;
    }
`;

export const Header = () => {

    return (
        <HeaderContainer>
            <img src="/nobel.svg" />
            <h1>Nobel Prize Catalog</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/categories">Category</Link>
                    </li>
                    <li>
                        <Link to="/year">Year</Link>
                    </li>
                </ul>
            </nav>
        </HeaderContainer>
    )
}; 
