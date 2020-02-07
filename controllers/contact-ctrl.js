const Contacts = require('../models/contacts-model');

del = (req, res) =>
{
    Contacts.update
    (
        {user_id: req.params.user_id},
        {$pull: {contacts: {_id: req.params.contact_id}}},
        (err, result) =>
        {
            if (err)
            {
                res.json({'success': false, 'message': 'An error has occurred.'});
            }
            
            if (result.nModified > 0)
            {
                res.json({'success': true, 'message': 'Contact has been deleted.'});
            }
            else
            {
                res.json({'success': false, 'message': 'Contact has not been deleted.'});
            }
        }
    )
};

search = (req, res) =>
{
	Contacts.aggregate
	(
		[
			{$match: {"user_id": req.params.user_id}},
			{$unwind: "$contacts"},
			{
				$match:
				{
					$or:
					[
						{"contacts.first_name": {$regex: "^" + req.params.query, '$options': 'i'}},
						{"contacts.last_name": {$regex: "^" + req.params.queryy, '$options': 'i'}},
						{"contacts.phone_number": {$regex: "^" + req.params.query, '$options': 'i'}},
						{"contacts.email": {$regex: "^" + req.params.query, '$options': 'i'}}
					]
				}
			}
		],
		(err, results) =>
		{
			if (err)
			{
				res.json({'success': false, 'message': 'An error has occurred.'});
			}
			
			if (results != "")
			{
				res.json(results);
			}
			else
			{
				res.json({'success': false, 'message': 'No search results.'});
			}
		}
	)
}

add = (req, res) =>
{
    let contact = req.body;

    Contacts.update
    (
        // {user_id: req.params.user_id},
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

showAll = (req, res) =>
{
    Contacts.aggregate
    (
        [
            {$match: {"user_id": req.params.user_id}},
            {$unwind: "$contacts"}
        ],
        (err, results) =>
        {
            if (err)
            {
                res.json({'success': false, 'message': 'An error has occurred.'});
            }
            
            if (results != "")
            {
                res.json(results);
            }
            else
            {
                res.json({'success': false, 'message': 'No search results.'});
            }
        }
    )
}

update = (req, res) =>
{
	let contact = req.body;

	Contacts.updateOne
	(
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
		(err, result) =>
		{
			if (err)
			{
                res.json({'success': false, 'message': 'An error has occurred.'});
            }
			
			if (result.nModified > 0)
			{
                res.json({'success': true, 'message': 'Contact has been updated.'});
            }
			else
			{
                res.json({'success': false, 'message': 'Contact has not been updated.'});
            }
		}
	)
};

module.exports = {
    del,
    search,
    add,
    showAll,
    update
}