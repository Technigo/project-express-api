import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import { App } from './App'

const BrowserHistory = Router.browserHistory;

ReactDOM.render(<Router history={BrowserHistory}><App /></Router>, document.getElementById('root'))
