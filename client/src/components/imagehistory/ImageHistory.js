import React, { Component } from 'react'
import Navigation from '../navigation/Navigation'
import axios from 'axios'
import './ImageHistory.css'
import moment from 'moment'


const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '39944fa1347a4b2bbd081ffed001395f'
   });

export default class ImageHistory extends Component {

    state = {
        currentUserId: this.props.match.params.id,
        currentUsername: '',
        allImages: [],
        isImageHistory: true,
        allFaces: []
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
      
    calculateFaceLocation = (data, id) => {
        const image = document.getElementById(`${id}`)
        const width = Number(image.width)
        const height = Number(image.height)
        return {
            leftCol: (data.left_col * width),
            topRow: (data.top_row * height),
            rightCol: (width - (data.right_col * width)),
            bottomRow: (height - (data.bottom_row * height))
        }
    }

    recognizeFace = async (event, image, id) => {
        event.preventDefault()
        const allFaces = []
        console.log('click')
        const newDetect = await app.models.predict(Clarifai.FACE_DETECT_MODEL, image)
        console.log(newDetect.outputs[0].data.regions)
        newDetect.outputs[0].data.regions.forEach(region => 
            allFaces.push(this.calculateFaceLocation(region.region_info.bounding_box, id))
        )
        console.log(allFaces)
        this.setState({allFaces}, () => {
            console.log(this.state.allFaces)
        })
    }

    formateDateTime = (date) => {
        let formatdateTime = moment(date).format("LLLL")
        return formatdateTime
    }

    render() {

        const everyImage = this.state.allImages.map((image, k) => {
            console.log(image)
            
            const allBoxes = this.state.allFaces.map((area, i) => {
                return (
                    <div className='bounding-box' key={i} style={{
                        top: area.topRow, 
                        right: area.rightCol, 
                        bottom: area.bottomRow, 
                        left: area.leftCol}}
                    ></div>
                )
            })
            return (
                <div className="ma4 container-images">
                    <h1>{this.formateDateTime(image.inputAt)}</h1>
                    <img src={image.imageUrl} width="500px" height="auto" id={k}/>
                    <button onClick={(event) => this.recognizeFace(event, image.imageUrl, k)} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib mt3">Scan</button>
                    {allBoxes}
                </div>
            )   
        })

        return (
            <div>
                <Navigation currentUser={this.props.match.params.id} isImageHistory={this.state.isImageHistory}/>
                <p className='f3'>
                    {'Image History by Date'}
                </p>
                <div className="center ma container">
                        {this.state.allImages 
                        ?
                        everyImage
                        : 
                        null}
                </div>
            </div>

        )
    }
}