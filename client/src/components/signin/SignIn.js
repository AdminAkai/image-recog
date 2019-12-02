import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class SignIn extends Component {

    state = {
        username: "",
        password: ""
    }

    onTextChange = (event) => {
        const previousState = { ...this.state }
        previousState[event.target.name] = event.target.value
        this.setState(previousState)
    }

    onSubmit = async (event) => {
        event.preventDefault()
        const newSignIn = await axios.post('/signin', this.state)
    }
        
    render() {
        return(
            <div className="flex center">
                <article class="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main class="pa4 black-80">
                        <form className="ba b--transparent ph0 mh0s">
                                <label className="db fw6 lh-copy f6 mt3" for="enteredUsername" placeholder='Username'>Username</label>
                                <input
                                    className="b input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    name="enteredUsername"
                                    type="string"
                                    required
                                    onChange={this.onTextChange}
                                    value={this.state.enteredUsername}
                                ></input>
                                <label className="db fw6 lh-copy f6 mt3" for="enteredPassword" placeholder='Password'>Password</label>
                                <input
                                    className="b input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    name="enteredPassword"
                                    type="password"
                                    required
                                    onChange={this.onTextChange}
                                    value={this.state.enteredPassword}
                                ></input>
                                <input
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib mt3" 
                                    type="submit" 
                                    onClick={this.verifyData} 
                                    value="Login"
                                ></input>
                        </form>
                        <Link to="/register" className="f6 link dim black db mt3">Sign up</Link>
                        <Link to="" className="f6 link dim black db mt3">Forgot your password?</Link>
                    </main>
                </article>
            </div>
        )
    }
} 