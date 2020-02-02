const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Contacts = new Schema(
    {
        user_id: {type: String, required: true},
        contacts: [
            {
                first_name: {type: String, required: true},
                last_name: {type: String},
                phone_number: {type: String},
                email: {type: String}
            }
        ]
    },
    {timestamps: true}
);

module.exports = mongoose.model('Contacts', Contacts)