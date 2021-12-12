const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    userChannel: {
        type: String,
        required: true
    },
    userDate: {
        type: Date,
        require: true,
        default: Date.now
    }
})


module.exports = mongoose.model('Subscriber', subscriberSchema)