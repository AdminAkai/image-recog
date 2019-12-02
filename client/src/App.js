import React, { Component } from 'react'
import { BrowserRouter  as Router, Switch, Route } from 'react-router-dom'
import ImageLinkForm from './components/imagelinkform/ImageLinkForm'
import SignIn from './components/signin/SignIn' 
import Register from './components/register/Register' 
import './App.css'
import 'tachyons'
import Particles from 'react-particles-js'
import particlesConfig from './particles/particlesConfig.js'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Particles params={particlesConfig} className='particles' />
        <Router>
          <Switch>
            <Route exact path='/' component={SignIn}/>
            <Route path='/register' component={Register} />
            <Route path='/dashboard/:id' component={ImageLinkForm}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
