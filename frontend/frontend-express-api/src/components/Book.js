import React from 'react'
import styled from 'styled-components'

const Item = styled.li`
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0,0,0,.12);
`

export const Book = ({ book }) => {
    return (
        <Item>{book.title} - {book.average_rating}</Item>
    )
}