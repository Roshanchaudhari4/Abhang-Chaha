const express = require('express');
const router = express.Router();
const { submitFeedback, submitContact } = require('../controllers/formController');

// POST /api/feedback
router.post('/feedback', submitFeedback);

// POST /api/contact
router.post('/contact', submitContact);

module.exports = router;
