import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function JobRequirementForm({ onSearch, loading }) {
  const [formData, setFormData] = useState({
    requiredSkills: '',
    minExperience: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = formData.requiredSkills.split(',').map(s => s.trim()).filter(s => s);
    onSearch({
      requiredSkills: skillsArray,
      minExperience: Number(formData.minExperience) || 0
    });
  };

  return (
    <div className="glass-card">
      <h3>Job Requirements</h3>
      <p style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>Enter the job criteria to find the best matching candidates.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Required Skills (comma separated)</label>
          <input 
            type="text" 
            name="requiredSkills" 
            value={formData.requiredSkills} 
            onChange={handleChange} 
            required 
            placeholder="e.g. React, Node.js" 
          />
        </div>
        <div className="form-group">
          <label>Minimum Experience (Years)</label>
          <input 
            type="number" 
            name="minExperience" 
            min="0"
            value={formData.minExperience} 
            onChange={handleChange} 
            placeholder="e.g. 2" 
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
          {loading ? <div className="loader"></div> : <><Search size={18} /> Find Matches</>}
        </button>
      </form>
    </div>
  );
}
