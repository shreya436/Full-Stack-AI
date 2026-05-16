const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const fetch = require('node-fetch'); // node-fetch v2 or native fetch (if Node v18+)

// POST /api/match
router.post('/', async (req, res) => {
  try {
    const { requiredSkills, minExperience } = req.body;
    
    // Fetch candidates who meet the minimum experience (optional, or we can fetch all and filter)
    const candidates = await Candidate.find();
    
    const matchedCandidates = candidates.map(candidate => {
      // Basic logic calculation
      const matchedSkills = candidate.skills.filter(skill =>
        requiredSkills.some(reqSkill => reqSkill.toLowerCase() === skill.toLowerCase())
      );
      
      const score = matchedSkills.length / requiredSkills.length;
      
      return {
        ...candidate.toObject(),
        matchScore: score * 100, // as percentage
        matchedSkills
      };
    })
    .filter(c => c.experience >= (minExperience || 0)) // filter by experience
    .sort((a, b) => b.matchScore - a.matchScore); // Sort descending

    res.json(matchedCandidates);
  } catch (err) {
    res.status(500).json({ error: 'Failed to match candidates', details: err.message });
  }
});

// POST /api/ai/shortlist
router.post('/ai/shortlist', async (req, res) => {
  try {
    const { requiredSkills, minExperience, candidates } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'OpenRouter API Key is missing' });
    }

    const candidateListText = candidates.map((c, index) => 
      `${index + 1}. ${c.name} - ${c.skills.join(', ')} - ${c.experience} years`
    ).join('\n');

    const prompt = `
Job requires: ${requiredSkills.join(', ')} (${minExperience}+ years experience)

Candidates:
${candidateListText}

Rank the candidates based on how well they match the job requirements. For each candidate, provide a brief 1-2 sentence explanation of why they are suitable or lacking. Return the results in a structured JSON format like this:
[
  { "candidateName": "Name", "rank": 1, "explanation": "Why..." },
  ...
]
Make sure to return strictly JSON, no markdown blocks.`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // default fallback or a good fast model available in OpenRouter. Wait, gpt-3.5 is good or meta-llama/llama-3-8b-instruct. I'll use a reliable fast one. gpt-3.5-turbo is generally supported, or openai/gpt-4o-mini
        response_format: { type: "json_object" }, // might not be supported by all models, safer to ask for JSON string. Actually, since prompt says return strictly JSON, we can just parse it. Let's use openai/gpt-4o-mini as it's cheap and smart.
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const aiData = await response.json();
    
    if (aiData.error) {
      throw new Error(aiData.error.message || 'Error from OpenRouter');
    }

    let aiRecommendations = aiData.choices[0].message.content;
    
    try {
      // Try to parse if it returned valid JSON
      if(aiRecommendations.startsWith('```json')) {
         aiRecommendations = aiRecommendations.replace(/```json/g, '').replace(/```/g, '').trim();
      }
      const parsedRecommendations = JSON.parse(aiRecommendations);
      res.json(parsedRecommendations);
    } catch (parseError) {
      // If parsing fails, just return the raw text
      res.json({ raw: aiRecommendations });
    }

  } catch (err) {
    console.error('AI Shortlist Error:', err);
    res.status(500).json({ error: 'Failed to generate AI shortlist', details: err.message });
  }
});

module.exports = router;
