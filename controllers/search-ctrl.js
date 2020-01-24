const Contacts = require('../models/contacts-model');

search = (req, res) => {
		Contacts.aggregate([
			{$match: {"user_id": req.params.user_id}},
			{$unwind: "$contacts"},
			{$match: {$or: [
				{"contacts.first_name": {$regex: req.params.query}},
				{"contacts.last_name": {$regex: req.params.query}},
				{"contacts.phone_number": {$regex: req.params.query}},
				{"contacts.email": {$regex: req.params.query}}
			]}}
		],
		(err, results) => {
			if (err) {
				res.status(400).json({'message': 'Error.'});
			}

			if (results != "") {
				res.json(results);
			}
			else {
				res.status(400).json({'message': 'No search results.'});
			}
		})
}

module.exports = {search};