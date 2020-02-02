import React, { useState, useEffect } from "react";
import { SyncLoader } from 'react-spinners'
import { Book } from './components/Book'
import styled from 'styled-components'

const NavBar = styled.nav`
    display: flex;
    margin-bottom: 16px;
`

const Order = styled.div`
    width: 50%;
`

const Select = styled.select`
    margin-left: 10px;
`

const Search = styled.form`
    width: 50%;
`

const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`

function App() {
    const [books, setBooks] = useState([]);
    const [order, setOrder] = useState("desc")
    const [title, setTitle] = useState("")
    const [searching, setSearching] = useState(false)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8080/books?rating=${order}&title=${title}`)
            .then(res => res.json())
            .then(json => {
                setBooks(json);
                setLoading(false);
            });
    }, [order, searching]);

    if (loading) {
        return <main><SyncLoader color='#000' /></main>
    }

    const handleSubmit = event => {
        event.preventDefault()
        setSearching(!searching)
    }

    return (
        <main>
            <NavBar>
                <Order>
                    <label>Rating:
                        <Select value={order} onChange={(e) => setOrder(e.target.value)}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </Select>
                    </label>
                </Order>
                <Search onSubmit={handleSubmit}>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    <input type="submit" value="search" />
                </Search>
            </NavBar>
            <List>
                {books.map(book => (
                    <Book key={book.bookID} book={book} />
                ))}
            </List>
        </main>
    );
}

export default App;