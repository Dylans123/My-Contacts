const Contacts = require('../models/contacts-model');

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
						{"contacts.last_name": {$regex: "^" + req.params.query, '$options': 'i'}},
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

module.exports = {search};