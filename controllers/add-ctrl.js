const Contacts = require('../models/contacts-model');

add = (req, res) => {
    let contact = req.body;

    Contacts.update(
            {user_id: contact.user_id},
            {
                $push: {
                    contacts: [
                        {
                            first_name: contact.contacts[0].first_name,
                            last_name: contact.contacts[0].last_name,
                            phone_number: contact.contacts[0].phone_number,
                            email: contact.contacts[0].email
                        }
                    ]
                }
            },
            {upsert: true},
        (err, result) => {
            if (err) {
                res.status(400).json({'message': 'Error.'});
            }
            
            if (result) {
                res.status(200).json({'message': 'Success.'});
            }
            else {
                res.status(400).json({'message': 'Unsuccessful.'});
            }
        })
};

module.exports = {add};