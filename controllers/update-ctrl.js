const Contacts = require('../models/contacts-model');

update = (req, res) => {
	let contact = req.body;

    Contacts.updateOne(
		{
			user_id: req.params.user_id,
			"contacts._id": req.params.contact_id
		},
		{
			$set:
			{
				"contacts.$.first_name": contact.contacts[0].first_name,
				"contacts.$.last_name": contact.contacts[0].last_name,
				"contacts.$.phone_number": contact.contacts[0].phone_number,
				"contacts.$.email": contact.contacts[0].email
			}
		},
		{},
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

module.exports = {update};