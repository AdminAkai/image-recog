const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

const LoginHistSchema = new mongoose.Schema({
    loginAttemptDate: {
        type: Date,
        required: true,
    }
})

const ImageHistSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
        unique: true,
    },
    inputAt: {
        type: Date,
        required: true
    },
    inputById: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    inputByName: {
        type: String,
        required: true
    }
})

const UserCollection = mongoose.model('Users', UserSchema)
const ImageHistCollection = mongoose.model('ImageHist', ImageHistSchema)
const LoginHistCollection = mongoose.model('LoginHist', LoginHistSchema)

// User CRUD
const getAllUsers = () => {
    return UserCollection.find({}).sort({username: 'ascending'})
}

const getUser = () => {
    return UserCollection.findById({_id: id})
}

const addNewUser = (data) => {
    return UserCollection.create(data)
}

const updateUser = (id, data) => {
    return UserCollection.updateOne({_id: id}, updateData)
}

const deleteUser = (id) => {
    return UserCollection.deleteOne({_id: id})
}

const verifyAuth = async (username, password) => {
    const verifyUser = await UserCollection.findOne({username: username})
    if (password === verifyUser.password) {
      return verifyUser
    } else {
      message = "error"
      return message
    }
  }

// Image History CRUD
const getAllImages = () => {
    return ImageHistCollection.find({}).sort({inputAt: 'descending'})
}

const getImage = (id) => {
    return ImageHistCollection.findById({_id: id})
}

const addNewImage = (data) => {
    return ImageHistCollection.create(data)
}

const deleteImage = (id) => {
    return ImageHistCollection.deleteOne({_id: id})
}

// login History
const newLogin = (data) => {
    return LoginHistCollection.create(data)
}

module.exports = {
    getAllUsers,
    getUser,
    addNewUser,
    updateUser,
    deleteUser,
    verifyAuth,
    getAllImages,
    getImage,
    addNewImage,
    deleteImage
}