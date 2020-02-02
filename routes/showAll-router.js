// Displays all contacts.
// Must provide user_id in route.
// 
// Example return object:
// [
//     {
//         "_id": "5e2a675ca8dc044bdf7db241",
//         "user_id": "00001",
//         "__v": 0,
//         "contacts": {
//             "_id": "5e2a7a67d051b2628a599f84",
//             "first_name": "Bob",
//             "last_name": "Smith",
//             "phone_number": "111-111-1111",
//             "email": "bob@email.com"
//         },
//         "createdAt": "2020-01-24T03:41:14.199Z",
//         "updatedAt": "2020-01-24T09:57:32.550Z"
//     },
//     {
//         "_id": "5e2a675ca8dc044bdf7db241",
//         "user_id": "00001",
//         "__v": 0,
//         "contacts": {
//             "_id": "5e2a7a67d051b2628a599f85",
//             "first_name": "Smith",
//             "last_name": "Bob",
//             "phone_number": "555-555-5555",
//             "email": "smith@email.com"
//         },
//         "createdAt": "2020-01-24T03:41:14.199Z",
//         "updatedAt": "2020-01-24T09:57:32.550Z"
//     }
// ]

const express = require('express');
const router = express.Router();
const controller = require('../controllers/showAll-ctrl');

router.get('/showAll/:user_id', controller.showAll);

module.exports = router;