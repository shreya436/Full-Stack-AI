const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// POST /api/candidates
router.post('/', async (req, res) => {
  try {
    const { name, email, skills, experience } = req.body;
    const newCandidate = new Candidate({
      name,
      email,
      skills,
      experience
    });
    const savedCandidate = await newCandidate.save();
    res.status(201).json(savedCandidate);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add candidate', details: err.message });
  }
});

// GET /api/candidates
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch candidates', details: err.message });
  }
});

module.exports = router;
