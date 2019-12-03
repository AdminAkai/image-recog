import React, { Component } from 'react'
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
        allImages: [],
        isImageHistory: true
      }

    componentDidMount() {
        this.setUser()
        console.log(this.state.currentUserId)
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
        console.log(this.state.allImages)
        const arrayOfImages = []
        console.log(arrayOfImages instanceof Array)
        const allImages = await axios.get(`/imagehistory/${this.props.match.params.id}`)
        console.log(allImages.data instanceof Array)
        allImages.data.forEach(element => {
          arrayOfImages.push(element)  
        })
        this.setState({allImages: arrayOfImages})
        console.log(this.state.allImages[0].imageUrl)
    }
      
    // calculateFaceLocation = (data) => {
    //     const image = document.getElementById('input-image')
    //     const width = Number(image.width)
    //     const height = Number(image.height)
    //     return {
    //         leftCol: (data.left_col * width) * .985,
    //         topRow: (data.top_row * height) * .985,
    //         rightCol: (width - (data.right_col * width)) * .985,
    //         bottomRow: (height - (data.bottom_row * height)) * .985
    //     }
    // }

    // recognizeFace = async (image) => {
    //     const allFaces = []
    //     console.log('click')
    //     const newDetect = await app.models.predict(Clarifai.FACE_DETECT_MODEL, image)
    //     console.log(newDetect.outputs[0].data.regions)
    //     newDetect.outputs[0].data.regions.forEach(region => 
    //         allFaces.push(this.calculateFaceLocation(region.region_info.bounding_box))
    //     )
    //     console.log(allFaces)
    //     return allFaces  
    // }

    render() {

        const everyImage = this.state.allImages.map(oneImage => {
            console.log(oneImage)
            return (
                <div className="absolute mt4">
                    <img src={oneImage.imageUrl}/>
                </div>
            )
        })

        return (
            <div>
                <Navigation currentUser={this.props.match.params.id} isImageHistory={this.state.isImageHistory}/>
                <p className='f3'>
                    {'Image History by Date'}
                </p>
                {this.state.allImages 
                ?
                null
                : 
                null}
            </div>
        )
    }
}