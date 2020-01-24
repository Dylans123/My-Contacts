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
				"contacts.$.first_name": contact.contacts.first_name,
				"contacts.$.last_name": contact.contacts.last_name,
				"contacts.$.phone_number": contact.contacts.phone_number,
				"contacts.$.email": contact.contacts.email
			}
		},
        (err, result) => {
            if (err) {
                res.json({'success': false, 'message': 'An error has occurred.'});
            }
			
            if (result.nModified > 0) {
                res.json({'success': true, 'message': 'Contact has been updated.'});
            }
            else {
                res.json({'success': false, 'message': 'Contact has not been updated.'});
            }
        })
};

module.exports = {update};