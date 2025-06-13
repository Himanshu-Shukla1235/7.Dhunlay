import React, { useState } from 'react';
import './createPlan.css';

const AdminCreatePlan = () => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    duration: '',
    features: '',
    maxSongs: '',
    revenueShare: '',
    planType: '', // ✅ Added planType to state
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const backendAppUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch(`${backendAppUrl}/api/createPlan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          duration: form.duration ? Number(form.duration) : undefined,
          features: form.features.split(',').map((f) => f.trim()),
          maxSongs: Number(form.maxSongs),
          revenueShare: form.revenueShare ? Number(form.revenueShare) : undefined,
          planType: form.planType, // ✅ Send planType
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Plan created successfully!');
        setForm({
          name: '',
          price: '',
          duration: '',
          features: '',
          maxSongs: '',
          revenueShare: '',
          planType: '', // ✅ Reset
        });
      } else {
        setMessage(`Error: ${data.error || 'Something went wrong'}`);
      }
    } catch (err) {
      setMessage(`Request failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-plan-container">
      <h2>Create New Plan</h2>
      {message && (
        <p className={`message ${message.startsWith('Error') || message.startsWith('Request') ? 'error' : 'success'}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Plan name (e.g., A-plan-1)"
          required
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price in ₹"
          required
        />
        <input
          name="duration"
          type="number"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration (months, optional)"
        />
        <input
          name="features"
          value={form.features}
          onChange={handleChange}
          placeholder="Features (comma separated)"
          required
        />
        <input
          name="maxSongs"
          type="number"
          value={form.maxSongs}
          onChange={handleChange}
          placeholder="Max Songs"
          required
        />
        <input
          name="revenueShare"
          type="number"
          value={form.revenueShare}
          onChange={handleChange}
          placeholder="Revenue Share % (optional)"
        />

        {/* ✅ planType input */}
        <select name="planType" value={form.planType} onChange={handleChange} required>
          <option value="">Select Plan Type</option>
          <option value="Label">Label</option>
          <option value="Artist">Artist</option>
           <option value="Both">Both</option>
         
        </select>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Plan'}
        </button>
      </form>
    </div>
  );
};

export default AdminCreatePlan;
