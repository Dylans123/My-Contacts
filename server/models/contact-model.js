const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Contact = new Schema(
    {
        name: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('contact', Contact)