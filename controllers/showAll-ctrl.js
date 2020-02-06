const Contacts = require('../models/contacts-model');

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
                res.json({'success': true, results: results});
            }
            else
            {
                res.json({'success': false, 'message': 'No search results.'});
            }
        }
    )
}

module.exports = {showAll};