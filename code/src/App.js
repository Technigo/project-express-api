import React from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { BookList } from './pages/BookList'
import { BookDetails } from './components/BookDetails'

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' exact>
                    <BookList />
                </Route>
                <Route path='/books/:id'>
                    <BookDetails />
                </Route>
            </Switch>
        </Router>
    )
}