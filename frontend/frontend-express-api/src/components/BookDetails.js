import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'
import styled from 'styled-components'

const Loading = styled.main`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Book = styled.div`
    min-width: 350px;
    border: 2px solid #000;
    padding: 16px;
    margin-bottom: 32px;
`

const Parameter = styled.span`
    font-weight: bold;
`

const Back = styled.span`
    background-color: #000;
    color: #fff;
    padding: 8px;

    &:hover {
        background-color: #fff;
        color: #000;
        border 2px solid #000;
    }
`

export const BookDetails = () => {
    const { id } = useParams()
    const [book, setBook] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true);
        fetch(`https://tavferreira-bookstore-api.herokuapp.com/books/${id}`)
            .then(res => res.json())
            .then(json => {
                setBook(json)
                setLoading(false)
            });
    }, [id])

    if (loading) {
        return <Loading><SyncLoader color='#000' /></Loading>
    }

    return (
        <main>
            <Book>
                <p><Parameter>Title: </Parameter>{book[0].title}</p>
                <p><Parameter>Author: </Parameter>{book[0].authors}</p>
                <p><Parameter>No. pages: </Parameter>{book[0].num_pages}</p>
                <p><Parameter>Rating: </Parameter>{book[0].average_rating} ({book[0].ratings_count} ratings)</p>
                <p><Parameter>ISBN: </Parameter>{book[0].isbn13}</p>
            </Book>

            <Link to="/"><Back>Go back</Back></Link>
        </main>
    )

}