import React from 'react';
import { Award, Zap, BrainCircuit } from 'lucide-react';

export default function ShortlistedDisplay({ matches, aiRecommendations, loadingAi }) {
  if (!matches || matches.length === 0) {
    return null;
  }

  const getScoreClass = (score) => {
    if (score >= 80) return 'score-high';
    if (score >= 50) return 'score-med';
    return 'score-low';
  };

  // Helper to find AI recommendation for a candidate
  const getAiRec = (candidateName) => {
    if (!aiRecommendations || !Array.isArray(aiRecommendations)) return null;
    return aiRecommendations.find(
      r => r.candidateName && r.candidateName.toLowerCase() === candidateName.toLowerCase()
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Award size={24} style={{ color: 'var(--success)' }} />
        <h2 style={{ margin: 0 }}>Top Candidates</h2>
      </div>

      {loadingAi && (
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--secondary)' }}>
          <BrainCircuit size={24} className="loader" style={{ animationDuration: '2s', color: 'var(--secondary)', border: 'none' }} />
          <p style={{ margin: 0, color: 'var(--secondary)' }}>AI is analyzing the candidates...</p>
        </div>
      )}

      {matches.map((candidate) => {
        const aiRec = getAiRec(candidate.name);
        
        return (
          <div key={candidate._id} className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
            {candidate.matchScore >= 80 && (
              <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--success)', color: '#fff', padding: '0.25rem 2rem', fontSize: '0.75rem', fontWeight: 'bold', transform: 'rotate(45deg) translate(25%, -50%)', transformOrigin: 'top right' }}>
                TOP MATCH
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div className={`score-circle ${getScoreClass(candidate.matchScore)}`}>
                {Math.round(candidate.matchScore)}%
              </div>
              
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '0.5rem' }}>{candidate.name}</h3>
                
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>Matched Skills:</p>
                  <div>
                    {candidate.matchedSkills.length > 0 ? (
                      candidate.matchedSkills.map((skill, i) => (
                        <span key={i} className="tag" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="tag" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171' }}>No exact skill matches</span>
                    )}
                  </div>
                </div>

                {aiRec && (
                  <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '1rem', borderRadius: '0.5rem', borderLeft: '3px solid var(--secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <BrainCircuit size={16} style={{ color: 'var(--secondary)' }} />
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>AI Insight (Rank #{aiRec.rank})</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', margin: 0, color: '#cbd5e1' }}>{aiRec.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
