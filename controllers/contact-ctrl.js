const Contact = require('../models/contact-model')

createContact = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Contact',
        })
    }

    const contact = new Contact(body)

    if (!contact) {
        return res.status(400).json({ success: false, error: err })
    }

    contact
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: contact._id,
                message: 'Contact created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Contact not created!',
            })
        })
}

// Gets contacts and returns json
getContact = (req, res) => {
    Contact.find()
        .sort({ date: -1 })
        .then(contacts => res.json(contacts))
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Error getting contacts',
            })
        });
};

module.exports = {
    createContact,
    getContact
}