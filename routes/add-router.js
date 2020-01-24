const express = require('express');
const router = express.Router();
const controller = require('../controllers/add-ctrl');

router.post('/add', controller.add);

module.exports = router;