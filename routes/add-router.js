// Adds a contact.
// Must provide user_id in route.
//
// Example send object:
// {
//     "contacts": [
//         {
//             "first_name": "first1",
//             "last_name": "last1",
//             "phone_number": "phone1",
//             "email": "email1"
//         },
//         {
//             "first_name": "first2",
//             "last_name": "last2",
//             "phone_number": "phone2",
//             "email": "email2"
//         }
//     ]
// }

const express = require('express');
const router = express.Router();
const controller = require('../controllers/add-ctrl');

router.post('/add/:user_id', controller.add);

module.exports = router;