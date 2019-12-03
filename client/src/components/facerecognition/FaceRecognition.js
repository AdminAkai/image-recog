import React, { Component } from 'react'
import './FaceRecognition.css'

export default class FaceRecognition extends Component {

    render() {
    
        const allBorders = this.props.boxArea.map(area => {
            return (
                <div className='bounding-box' style={{
                    top: this.area.topRow, 
                    right: this.area.rightCol, 
                    bottom: this.area.bottomRow, 
                    left: this.area.leftCol}}
                ></div>
            )
        })   


        return(
            <div className='center ma container'>
                <div className="absolute mt4">
                    <img alt='' id='input-image' src={this.props.imageUrl} width="500px" height="auto"></img>
                    {allBorders}
                </div>
            </div>
        )
    }
}