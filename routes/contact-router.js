const express = require('express')

const ContactCtrl = require('../controllers/contact-ctrl')

const router = express.Router()

router.post('/contacts', ContactCtrl.createContact)

module.exports = router