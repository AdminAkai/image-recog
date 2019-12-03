import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class SignIn extends Component {

    state = {
        username: "",
        password: "",
        email: "",
        createdAt: new Date()
    }

    onTextChange = (event) => {
        const previousState = { ...this.state }
        console.log(`${event.target.name}: ${event.target.value}`)
        previousState[event.target.name] = event.target.value
        this.setState(previousState)
    }

    createAccount = async (event) => {
        event.preventDefault()
        console.log('click')
        const data = { ...this.state }
        await axios.post('/register', data)
        alert(`${this.state.email} registered!`)
    }
        
    render() {
        return(
            <div className="flex center">
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <form className="ba b--transparent ph0 mh0s">
                                <label className="db fw6 lh-copy f6 mt3" htmlFor="username" placeholder='Username'>Username</label>
                                <input
                                    className="b input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    name="username"
                                    type="string"
                                    required
                                    onChange={this.onTextChange}
                                    value={this.state.username}
                                ></input>
                                <label className="db fw6 lh-copy f6 mt3" htmlFor="email" placeholder='Email'>Email</label>
                                <input
                                    className="b input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    name="email"
                                    type="string"
                                    required
                                    onChange={this.onTextChange}
                                    value={this.state.email}
                                ></input>   
                                <label className="db fw6 lh-copy f6 mt3" htmlFor="password" placeholder='Password'>Password</label>
                                <input
                                    className="b input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    name="password"
                                    type="password"
                                    required
                                    onChange={this.onTextChange}
                                    value={this.state.password}
                                ></input>
                                <input
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib mt3" 
                                    type="submit" 
                                    onClick={this.createAccount} 
                                    value="Register"
                                ></input>
                        </form>
                        <Link to="/" className="f6 link dim black db mt3">Back to login</Link>
                    </main>
                </article>
            </div>
        )
    }
} 
