import { Link } from "react-router-dom";

export const Header = () => {

    return (
        <header>
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
        </header>
    )
}; 
