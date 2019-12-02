import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SignIn extends Component {

    state = {
        username: "",
        password: ""
    }

    onTextChange = (event) => {
        previousState = { ...this.state }
        previousState[event.target.name] = event.target.value
        this.setState(previousState)
    }

    onSubmit = async (event) => {
        event.preventDefault()
        const newSignIn = await axios.post('/signin', this.state)
    }
        
    render() {
        return(
            <div>
                <article class="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main class="pa4 black-80">
                <form class="measure center">
                    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                    <legend class="f4 fw6 ph0 mh0">Sign In</legend>
                    <div class="mt3">
                        <label class="db fw6 lh-copy f6" for="email-address" placeholder='Email'>Email</label>
                        <input class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"></input>
                    </div>
                    <div class="mv3">
                        <label class="db fw6 lh-copy f6" for="password" placeholder='Password'>Password</label>
                        <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"></input>
                    </div>
                    </fieldset>
                    <div class="">
                    <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"></input>
                    </div>
                    <div class="lh-copy mt3">
                    <Link to="/register" class="f6 link dim black db">Sign up</Link>
                    <Link to="" class="f6 link dim black db">Forgot your password?</Link>
                    </div>
                </form>
                </main>
                </article>
            </div>
        )
    }
} 