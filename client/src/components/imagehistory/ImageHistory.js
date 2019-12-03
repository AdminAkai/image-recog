import React, { Component } from 'react'
import FaceRecognition from '../facerecognition/FaceRecognition'
import Navigation from '../navigation/Navigation'
import axios from 'axios'


const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '39944fa1347a4b2bbd081ffed001395f'
   });

export default class ImageHistory extends Component {

    state = {
        currentUserId: this.props.match.params.id,
        currentUsername: '',
        displayBox: [],
        allImages: []
      }

    componentDidMount() {
        this.setUser()
        this.getAllImages()
    }

    setUser = async () => {
        const currentUser = await axios.get(`/getuser/${this.props.match.params.id}`) 
        const currentUserInfo = {
            currentUserId: currentUser.data._id,
            currentUsername: currentUser.data.username
        }
        this.setState(currentUserInfo)
    }

    getAllImages = async () => {
        const allImages = await axios.get(`/imagehistory/${this.state.currentUserId}`)
        console.log(allImages)
    }
      
    calculateFaceLocation = (data) => {
        const image = document.getElementById('input-image')
        const width = Number(image.width)
        const height = Number(image.height)
        return {
            leftCol: (data.left_col * width) * .985,
            topRow: (data.top_row * height) * .985,
            rightCol: (width - (data.right_col * width)) * .985,
            bottomRow: (height - (data.bottom_row * height)) * .985
        }
    }

    displayFaceBox = (displayBox) => {
        this.setState({displayBox})
        console.log(this.state.displayBox)
    }

    render() {
        return (
            <div>
            <Navigation />
                <p className='f3'>
                    {'Image History by Date'}
                </p>
                {this.state.imageUrl 
                ?
                <FaceRecognition imageUrl={this.state.imageUrl} boxArea={this.state.displayBox}/>
                : 
                null}
            </div>
        )
    }
}