import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navigation extends Component {

    state = {
        isImageHistory: false
    }

    componentDidMount() {
        this.setNavbar()
    }

    setNavbar = () => {
        this.setState({isImageHistory: this.props.isImageHistory})
    }

    render() {
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                {this.state.isImageHistory ?
                <Link  to={`/dashboard/${this.props.currentUser}`} className='f3 link dim black underline pa3 pointer'> Dashboard </Link>
                :
                <Link  to={`/dashboard/history/${this.props.currentUser}`} className='f3 link dim black underline pa3 pointer'> Image History </Link>
                }
                <Link  to="/" className='f3 link dim black underline pa3 pointer'> Sign Out </Link>
            </nav>
        )
    }
}