import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CandidateForm from '../components/CandidateForm';
import CandidateList from '../components/CandidateList';
import { Users } from 'lucide-react';
import API_BASE_URL from '../config';

export default function Home() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/candidates`);
      setCandidates(res.data);
    } catch (err) {
      console.error('Error fetching candidates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCandidateAdded = (newCandidate) => {
    setCandidates([newCandidate, ...candidates]);
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="gradient-text">Candidate Dashboard</h1>
        <p>Manage your candidate pool and add new profiles to the system.</p>
      </div>
      
      <div className="grid-2">
        <div>
          <CandidateForm onCandidateAdded={handleCandidateAdded} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Users size={24} style={{ color: 'var(--primary)' }} />
            <h2 style={{ margin: 0 }}>Registered Candidates</h2>
            <span className="tag" style={{ marginLeft: 'auto', marginBottom: 0 }}>{candidates.length} Total</span>
          </div>
          <CandidateList candidates={candidates} loading={loading} />
        </div>
      </div>
    </div>
  );
}
