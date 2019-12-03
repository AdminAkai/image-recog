
const express = require('express')


const IRCModelApi = require('../models/IRCModel.js')


const ImageRecognitionController = express.Router()

// Register User
ImageRecognitionController.post('/register', async (req, res) => {
  try {
    const registeredUser = await IRCModelApi.addNewUser(req.body)
    return res.status(200).json(registeredUser)
  } catch(e) {
    const message = 'Failed to register user'
    res.status(500).json({
      error: e,
      message
    })
  }
})

// Login
ImageRecognitionController.post('/verify', async (req, res) => {
  console.log(req.body.username)
  console.log(req.body.password)
  console.log(req.body.loginAttemptDate)
  try {
    const newLogin = await IRCModelApi.newLogin(req.body.loginAttemptDate)
    console.log(newLogin)
    const verifiedUser = await IRCModelApi.verifyAuth(req.body.username, req.body.password)
    console.log(verifiedUser)
    return res.status(200).json(verifiedUser)
  } catch(e) {
    const message = 'Failed to verify user'
    res.status(500).json({ 
      error: e,
      message
    })
  }
})

// Get User
ImageRecognitionController.get('/getuser/:id', async (req, res) => {
  try {
    const currentUser = await IRCModelApi.getUser(req.params.id)
    return res.status(200).json(currentUser)
  } catch(e) {
    const message = 'Failed to get user'
    res.status(500).json({
      error: e,
      message
    })
  }
})

// Insert Image URL
ImageRecognitionController.post('/image', async (req, res) => {
  try {
    const newImage = await IRCModelApiApi.addNewImage(req.body)
    return res.status(200).json(newImage)
  } catch(e) {
    const message = 'Failed to insert image'
    res.status(500).json({
      error: e,
      message
    })
  }
})

module.exports = {
  ImageRecognitionController
}
