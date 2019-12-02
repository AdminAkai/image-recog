
const express = require('express')


const IRCModelApi = require('../models/IRCModel.js')


const ImageRecognitionController = express.Router()


ImageRecognitionController.post('/register', async (req, res) => {
  try {
    const registeredUser = await IRCModelApi.addNewUser(req.body)
    return res.status(201s).json(registeredUser)
  } catch(e) {
    const message = 'Failed to register user'
    res.status(500).json({
      error: e,
      message
    })
  }
})

ImageRecognitionController.post('/login', async (req, res) => {
  
})

module.exports = {
  ImageRecognitionController
}
