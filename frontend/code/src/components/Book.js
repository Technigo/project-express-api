import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import './book.css'

const Item = styled.li`
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0,0,0,.12);
    margin-bottom: 8px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
`

const BookInfo = styled.div`
    width: 80%;
`

const Title = styled.p`
    font-size: 1.25rem;
    line-height: 2rem;
    overflow: hidden;
    margin: 0;
`

const Authors = styled.p`
    margin: 0;
    font-size: .875rem;
    line-height: 1.25rem;
    opacity: 0.6;
`

const Rating = styled.span`
    background-color: ${props => props.rating > 4.25 ? "green" : props.rating > 3.5 ? "yellow" : "red"};
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
`

export const Book = ({ book }) => {
    return (
        <Link key={book.bookID} to={`/books/${book.bookID}`}>
            <Item>
                <BookInfo>
                    <Title>{book.title}</Title>
                    <Authors>Authors: {book.authors}</Authors>
                </BookInfo>
                <Rating rating={book.average_rating}>{book.average_rating}</Rating>
            </Item>
        </Link>
    )
}