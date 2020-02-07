const Contacts = require('../models/contacts-model');

add = (req, res) =>
{
    let contact = req.body;

    Contacts.update
    (
        {user_id: req.params.user_id},
        // {
        //     $push:
        //     {
        //         contacts:
        //         [
        //             {
        //                 first_name: contact.contacts.first_name,
        //                 last_name: contact.contacts.last_name,
        //                 phone_number: contact.contacts.phone_number,
        //                 email: contact.contacts.email
        //             }
        //         ]
        //     }
        // },
        {$push: {contacts: {$each: contact.contacts}}},
        {upsert: true}, 
        (err, result) =>
        {
            if (err)
            {
                res.json({'success': false, 'message': 'An error has occurred.'});
            }

            if (result.n > 0)
            {
                res.json({'success': true, 'message': 'Contact has been added.'});
            }
            else
            {
                res.json({'success': false, 'message': 'Contact has not been added.'});
            }
        }
    )
};

module.exports = {add};