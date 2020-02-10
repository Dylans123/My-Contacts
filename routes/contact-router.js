const express = require('express');
const router = express.Router();
const controller = require('../controllers/contact-ctrl');

router.get('/delete/:user_id/:contact_id', controller.del);
router.get('/search/:user_id/:query', controller.search);
router.get('/showAll/:user_id', controller.showAll);
router.post('/update/:user_id/:contact_id', controller.update);
router.post('/add/:user_id', controller.add);

module.exports = router;