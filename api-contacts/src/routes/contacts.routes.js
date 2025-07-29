const express = require('express');
const router = express.Router();

// Import the controller functions
const {getContacts,createContact,deleteContact,updateContact} = require('../controllers/contacts.controller');

router.get('/', (req, res) => {
  res.send('Contacts API');
});

// Define the routes for contacts
router.get('/contacts', (req, res) => {
  getContacts(req, res);
});

router.post('/contacts', (req, res) => {
    createContact(req, res);
});

router.put('/contacts/:id', (req, res) => {
    updateContact(req, res);
});

router.delete('/contacts/:id', (req, res) => {  
    deleteContact(req, res);
});

module.exports = router;