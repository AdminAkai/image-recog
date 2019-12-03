import React, { Component } from 'react'
import FaceRecognition from '../facerecognition/FaceRecognition'
import './ImageLinkForm.css'
import Navigation from '../navigation/Navigation'
import axios from 'axios'


const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '39944fa1347a4b2bbd081ffed001395f'
   });

export default class ImageLinkForm extends Component {

    state = {
        currentUserId: this.props.match.params.id,
        currentUsername: '',
        input: '',
        imageUrl:'',
        displayBox: [],
        date: new Date()
      }

    componentDidMount() {
        this.setUser()
    }

    setUser = async () => {
        const currentUser = await axios.get(`/getuser/${this.props.match.params.id}`) 
        const currentUserInfo = {
            currentUserId: currentUser.data._id,
            currentUsername: currentUser.data.username
        }
        this.setState(currentUserInfo)
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

    onTextChange = (event) => {
        const previousData = { ...this.state }
        previousData[event.target.name] = event.target.value
        this.setState(previousData)
    }

    onButtonClick = async (event) => {
        event.preventDefault()
        const allFaces = []
        this.setState({imageUrl: this.state.input}, async () => {
            console.log('click')
            const newDetect = await app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.imageUrl)
            console.log(newDetect.outputs[0].data.regions)
            newDetect.outputs[0].data.regions.forEach(region => 
                allFaces.push(this.calculateFaceLocation(region.region_info.bounding_box))
            )
            console.log(allFaces)
            this.displayFaceBox(allFaces)    
            const data = {
                imageUrl: this.state.imageUrl,
                inputAt: this.state.date,
                inputById: this.state.currentUserId,
                inputByName: this.state.currentUsername
            }
            console.log(data)
            // const newImageInput = await axios.post('/image', data)
            // console.log(newImageInput)
        })
    }

    render() {
        return (
            <div>
            <Navigation currentUser={this.props.match.params.id}/>
                <p className='f3'>
                    {'This will detect faces in your pictures.'}
                </p>
                <div className='image-recognizer'>
                    <form className='form'>
                        <input className='f4 w-70 center' type='text' placeholder='Image URL' name="input" onChange={this.onTextChange} value={this.state.url}></input>
                        <input className='w-30 grow f4 link ph2 pv1 dib white bg-light-blue' type='submit' value='Recognize' onClick={this.onButtonClick}></input>
                    </form>
                </div>
                {this.state.imageUrl 
                ?
                <FaceRecognition imageUrl={this.state.imageUrl} boxArea={this.state.displayBox}/>
                : 
                null}
            </div>
        )
    }
}