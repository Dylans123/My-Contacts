const express = require('express');
const router = express.Router();
const controller = require('../controllers/update-ctrl');

router.post('/update/:user_id&:contact_id', controller.update);

module.exports = router;