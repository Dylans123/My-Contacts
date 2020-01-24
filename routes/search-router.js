const express = require('express');
const router = express.Router();
const controller = require('../controllers/search-ctrl');

router.get('/search/:user_id&:query', controller.search);

module.exports = router;