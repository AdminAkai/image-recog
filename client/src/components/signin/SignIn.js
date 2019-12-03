import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

export default class SignIn extends Component {

    state = {
        currentUserId: "",
        username: "",
        password: "",
        loggedIn: false,
        loginAttemptDate: new Date()
    }

    currentDashboard = `/dashboard/${this.state.currentUserId}`

    onTextChange = (event) => {
        const previousState = { ...this.state }
        previousState[event.target.name] = event.target.value
        this.setState(previousState)
    }
        

    renderRedirect = () => {
        if (this.state.loggedIn) {
            return <Redirect to={this.currentDashboard}></Redirect>
        }
    }


    verifyData = async (event) => {
        event.preventDefault()
        const currentUser = { ...this.state }
        const verifiedUser = await axios.post('/verify', currentUser)
        if (verifiedUser.data !== 'error') {
            this.setState({currentUserId: verifiedUser.data._id}, () => {
                this.currentDashboard = `/dashboard/${this.state.currentUserId}`
                console.log(this.currentDashboard)
                this.setState({loggedIn: true})
            })
        } else {
            alert('Username/Password Incorrect')
        }
    }

    render() {
        return(
            <div className="flex center h-100">
                {this.renderRedirect()}
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <form className="ba b--transparent ph0 mh0s">
                                <label className="db fw6 lh-copy f6 mt3" placeholder='Username'>Username</label>
                                <input
                                    className="b input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    name="username"
                                    type="string"
                                    required
                                    onChange={this.onTextChange}
                                    value={this.state.username}
                                ></input>
                                <label className="db fw6 lh-copy f6 mt3" placeholder='Password'>Password</label>
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