// Delete a contact.
// Must provide user_id in route.
// Must provide contact_id in route.

const express = require('express');
const router = express.Router();
const controller = require('../controllers/delete-ctrl');

router.get('/delete/:user_id/:contact_id', controller.del);

module.exports = router;