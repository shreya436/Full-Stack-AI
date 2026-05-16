import React from 'react';
import { Users, Briefcase, Mail } from 'lucide-react';

export default function CandidateList({ candidates, loading }) {
  if (loading) {
    return <div className="glass-card" style={{ textAlign: 'center' }}><div className="loader" style={{ margin: '0 auto' }}></div><p style={{ marginTop: '1rem' }}>Loading candidates...</p></div>;
  }

  if (candidates.length === 0) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <Users size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
        <p>No candidates found. Add some to get started!</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {candidates.map((candidate) => (
        <div key={candidate._id} className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ marginBottom: '0.25rem' }}>{candidate.name}</h3>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <Mail size={14} /> {candidate.email}
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                <Briefcase size={14} /> {candidate.experience} years experience
              </p>
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            {candidate.skills.map((skill, index) => (
              <span key={index} className="tag">{skill}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
