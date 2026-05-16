import React, { useState } from 'react';
import axios from 'axios';
import JobRequirementForm from '../components/JobRequirementForm';
import ShortlistedDisplay from '../components/ShortlistedDisplay';
import { Target } from 'lucide-react';
import API_BASE_URL from '../config';

export default function Shortlist() {
  const [matches, setMatches] = useState([]);
  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (criteria) => {
    setLoading(true);
    setHasSearched(true);
    setAiRecommendations(null); // Reset AI recs
    
    try {
      // 1. Basic Match
      const res = await axios.post(`${API_BASE_URL}/api/match`, criteria);
      const matchedCandidates = res.data;
      setMatches(matchedCandidates);
      
      // 2. If we have matches, get AI ranking
      if (matchedCandidates.length > 0) {
        setLoadingAi(true);
        try {
          const aiRes = await axios.post(`${API_BASE_URL}/api/match/ai/shortlist`, {
            requiredSkills: criteria.requiredSkills,
            minExperience: criteria.minExperience,
            candidates: matchedCandidates.map(c => ({
              name: c.name,
              skills: c.skills,
              experience: c.experience
            }))
          });
          
          if (Array.isArray(aiRes.data)) {
            setAiRecommendations(aiRes.data);
          } else {
            console.warn('AI response was not an array:', aiRes.data);
          }
        } catch (aiErr) {
          console.error('Error fetching AI recommendations:', aiErr);
        } finally {
          setLoadingAi(false);
        }
      }
      
    } catch (err) {
      console.error('Error finding matches:', err);
      alert('Failed to fetch matches. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="gradient-text">Job Matching & Shortlisting</h1>
        <p>Find the best candidates for your open positions using basic skill matching and AI analysis.</p>
      </div>

      <div className="grid-2">
        <div>
          <JobRequirementForm onSearch={handleSearch} loading={loading} />
        </div>
        
        <div>
          {hasSearched && matches.length === 0 && !loading ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <Target size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
              <p>No candidates found matching these criteria.</p>
            </div>
          ) : (
            <ShortlistedDisplay 
              matches={matches} 
              aiRecommendations={aiRecommendations} 
              loadingAi={loadingAi} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
