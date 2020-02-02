import React, { useState, useEffect } from "react"
import { SyncLoader } from 'react-spinners'
import { Book } from '../components/Book'
import styled from 'styled-components'

const Main = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Loading = styled.main`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

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
    display: flex;
    justify-content: flex-end;
`

const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`

const Footer = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
`

const Page = styled.p`
    margin: 0px 24px;

`

export const BookList = () => {
    const [books, setBooks] = useState([])
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState()
    const [order, setOrder] = useState("")
    const [title, setTitle] = useState("")
    const [searching, setSearching] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true);
        fetch(`https://tavferreira-bookstore-api.herokuapp.com/books?page=${page}${order !== "" && order !== "unord" ? `&rating=${order}` : ""}${title !== "" ? `&title=${title}` : ""}`)
            .then(res => res.json())
            .then(json => {
                setBooks(json);
                setTotalPages(json.totalPages)
                setLoading(false);
            });
    }, [order, searching, page]);

    if (loading) {
        return <Loading><SyncLoader color='#000' /></Loading>
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (page !== 0) 
            setPage(0)
        else setSearching(!searching)

    }

    return (
        <Main>
            <NavBar>
                <Order>
                    <label>Rating:
                        <Select value={order} onChange={(e) => setOrder(e.target.value)}>
                            <option value="" disabled>Select order</option>
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
                {books.booksData.map(book => (
                    <Book key={book.bookID} book={book} />
                ))}
            </List>
            <Footer>
                {page > 0 && (
                    <button type="button" onClick={() => setPage(page - 1)}>Previous page</button>
                )}
                <Page>Page {page + 1} / {totalPages + 1}</Page>
                {page < totalPages && (
                    <button type="button" onClick={() => setPage(page + 1)}>Next page</button>
                )}
            </Footer>
        </Main>
    )
}