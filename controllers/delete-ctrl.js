const Contacts = require('../models/contacts-model');

del = (req, res) => {
    Contacts.update(
    {user_id: req.params.user_id},
    {
        $pull: {contacts: {_id: req.params.contact_id}},
    },
    (err, result) => {
        if (err) {
            res.json({'success': false, 'message': 'An error has occurred.'});
        }
        
        if (result.nModified > 0) {
            res.json({'success': true, 'message': 'Contact has been deleted.'});
        }
        else {
            res.json({'success': false, 'message': 'Contact has not been deleted.'});
        }
    })
};

module.exports = {del};