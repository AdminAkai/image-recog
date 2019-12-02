import React, { Component } from 'react'
import './FaceRecognition.css'

export default class FaceRecognition extends Component {

    render() {
        return(
            <div className='center ma container'>
                <div className="absolute mt4">
                    <img alt='' id='input-image' src={this.props.imageUrl} width="500px" height="auto"></img>
                    <div className='bounding-box' style={{top: this.props.boxArea.topRow, right: this.props.boxArea.rightCol, bottom: this.props.boxArea.bottomRow, left: this.props.boxArea.leftCol}}></div>
                </div>
            </div>
        )
    }
}