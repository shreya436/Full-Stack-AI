import React, { useState } from 'react';
import axios from 'axios';
import { UserPlus } from 'lucide-react';
import API_BASE_URL from '../config';

export default function CandidateForm({ onCandidateAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    experience: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);
      const payload = {
        ...formData,
        skills: skillsArray,
        experience: Number(formData.experience)
      };
      
      const res = await axios.post(`${API_BASE_URL}/api/candidates`, payload);
      onCandidateAdded(res.data);
      setFormData({ name: '', email: '', skills: '', experience: '' });
    } catch (err) {
      console.error('Error adding candidate:', err);
      alert('Failed to add candidate. Please check the server connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
      <h3><UserPlus size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }}/> Add New Candidate</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Rahul Sharma" />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="e.g. rahul@example.com" />
        </div>
        <div className="form-group">
          <label>Skills (comma separated)</label>
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} required placeholder="e.g. React, Node.js, MongoDB" />
        </div>
        <div className="form-group">
          <label>Years of Experience</label>
          <input type="number" name="experience" min="0" value={formData.experience} onChange={handleChange} required placeholder="e.g. 2" />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <div className="loader"></div> : 'Save Candidate'}
        </button>
      </form>
    </div>
  );
}
