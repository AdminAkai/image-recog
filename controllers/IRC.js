
const express = require('express')


const IRCModelApi = require('../models/IRCModel.js')


const ImageRecognitionController = express.Router()


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
  try {
    await IRCModelApi.newLogin(req.body.date)
    const verifiedUser = await IRCModelApi.verifyAuth(req.body.username, req.body.password)
    console.log(verifiedUser)
    return res.status(200).json(verifiedUser)
  } catch(e) {
    const message = 'Failed to verify user'
    res.status(500).json({ 
      error: e,
      message,
    })
  }
})


module.exports = {
  ImageRecognitionController
}
