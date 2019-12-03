import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navigation extends Component {

    render() {
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Link  to="/history" className='f3 link dim black underline pa3 pointer'> Image History </Link>
                <Link  to="/" className='f3 link dim black underline pa3 pointer'> Sign Out </Link>
            </nav>
        )
    }
}