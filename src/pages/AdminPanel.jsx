import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { LayoutDashboard, MessageSquare, DollarSign, Calendar, Image as ImageIcon, CheckCircle, Trash2, LogOut, Users, FolderOpen, TrendingUp, AlertCircle, Upload, XCircle, FileText, ChevronDown, ChevronUp } from 'lucide-react';

const AdminPanel = () => {
  const { API_BASE, token, setToken, projects, setProjects, feedbacks, setFeedbacks, pricingPlans, setPricingPlans, appointments, setAppointments } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [newProject, setNewProject] = useState({ title: '', desc: '', link: '', file: null, preview: '' });
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [noteDialog, setNoteDialog] = useState(null); // { id, action: 'Rejected'|'Completed', note: '' }
  const [expandedAppt, setExpandedAppt] = useState(null); // for viewing notes

  // Toast helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Confirm dialog helper
  const showConfirm = (title, message, onConfirm) => {
    setConfirmDialog({ title, message, onConfirm });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success && data.accessToken) {
        localStorage.setItem('devcraft_token', data.accessToken);
        setToken(data.accessToken);
        setIsAuthenticated(true);
      } else {
        showToast(data.message || 'Invalid access credentials.', 'error');
      }
    } catch {
      showToast('Server connection failed', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('devcraft_token');
    setToken(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrap">
        <form onSubmit={handleLogin} className="admin-login-card">
          <div className="admin-login-icon">
            <LayoutDashboard size={28} />
          </div>
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Sign in to access the admin dashboard</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Access Dashboard</button>
        </form>
        {toast && <div className={`admin-toast ${toast.type}`}>{toast.message}</div>}
      </div>
    );
  }

  const safeFeedbacks = Array.isArray(feedbacks) ? feedbacks : [];
  const safeAppointments = Array.isArray(appointments) ? appointments : [];
  const safePricing = Array.isArray(pricingPlans) ? pricingPlans : [];
  const safeProjects = Array.isArray(projects) ? projects : [];

  const pendingFeedbacks = safeFeedbacks.filter(fb => !fb.approved);
  const pendingAppointments = safeAppointments.filter(a => a.status === 'Pending');
  const contactedAppointments = safeAppointments.filter(a => a.status === 'Contacted');
  const rejectedAppointments = safeAppointments.filter(a => a.status === 'Rejected');
  const completedAppointments = safeAppointments.filter(a => a.status === 'Completed');

  // --- Feedback Handlers ---
  const approveFeedback = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/feedback/${id}/approve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ approved: true })
      });
      if (res.ok) {
        setFeedbacks(safeFeedbacks.map(fb => (fb._id || fb.id) === id ? { ...fb, approved: true } : fb));
        showToast('Feedback approved successfully');
      }
    } catch (err) { console.error(err); }
  };

  const deleteFeedback = async (id) => {
    showConfirm('Delete Feedback', 'This feedback will be permanently removed. Continue?', async () => {
      try {
        const res = await fetch(`${API_BASE}/feedback/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          setFeedbacks(safeFeedbacks.filter(fb => (fb._id || fb.id) !== id));
          showToast('Feedback deleted');
        }
      } catch (err) { console.error(err); }
      setConfirmDialog(null);
    });
  };

  // --- Appointment Handlers ---
  const markApptContacted = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/appointments/${id}/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: 'Contacted' })
      });
      if (res.ok) {
        setAppointments(safeAppointments.map(apt => (apt._id || apt.id) === id ? { ...apt, status: 'Contacted' } : apt));
        showToast('Marked as contacted');
      } else {
        showToast('Failed to update status', 'error');
      }
    } catch (err) { console.error(err); }
  };

  const openNoteDialog = (id, action) => {
    setNoteDialog({ id, action, note: '' });
  };

  const submitStatusWithNote = async () => {
    if (!noteDialog) return;
    const { id, action, note } = noteDialog;
    try {
      const res = await fetch(`${API_BASE}/appointments/${id}/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: action, note: note })
      });
      if (res.ok) {
        setAppointments(safeAppointments.map(apt =>
          (apt._id || apt.id) === id ? { ...apt, status: action, note: note } : apt
        ));
        showToast(`Appointment marked as ${action}`);
      } else {
        showToast('Failed to update status', 'error');
      }
    } catch (err) { console.error(err); }
    setNoteDialog(null);
  };

  const deleteAppt = async (id) => {
    showConfirm('Delete Appointment', 'This appointment record will be permanently removed. Continue?', async () => {
      try {
        const res = await fetch(`${API_BASE}/appointments/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          setAppointments(safeAppointments.filter(apt => (apt._id || apt.id) !== id));
          showToast('Appointment deleted');
        }
      } catch (err) { console.error(err); }
      setConfirmDialog(null);
    });
  };

  // --- Pricing Handlers ---
  const updatePriceAmount = (id, newAmount) => {
    setPricingPlans(safePricing.map(p => (p._id || p.id) === id ? { ...p, amount: newAmount } : p));
  };
  const updatePricePrefix = (id, newPrefix) => {
    setPricingPlans(safePricing.map(p => (p._id || p.id) === id ? { ...p, prefix: newPrefix } : p));
  };

  const handleSavePricing = async (plan) => {
    try {
      const res = await fetch(`${API_BASE}/pricing/${plan._id || plan.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ amount: plan.amount, prefix: plan.prefix })
      });
      if (res.ok) showToast('Pricing updated successfully');
      else showToast('Failed to save pricing', 'error');
    } catch (err) {
      console.error('Failed to save to database', err);
      showToast('Connection error', 'error');
    }
  };

  // --- Project Handlers ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setNewProject({ ...newProject, file, preview: previewUrl });
  };

  const addProject = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.file) return showToast('Title and image are required!', 'error');
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('title', newProject.title);
      formData.append('description', newProject.desc);
      formData.append('link', newProject.link);
      formData.append('image', newProject.file);

      const res = await fetch(`${API_BASE}/works`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        const savedWork = await res.json();
        setProjects([...safeProjects, savedWork]);
        setNewProject({ title: '', desc: '', link: '', file: null, preview: '' });
        showToast('Project added successfully');
      } else {
        const errData = await res.json().catch(() => ({}));
        showToast(`Upload failed: ${errData.message || errData.error || 'Unknown error'}`, 'error');
        if (res.status === 401) {
          localStorage.removeItem('devcraft_token');
          window.location.reload();
        }
      }
    } catch (err) {
      console.error('Transmission error', err);
      showToast('Upload failed - network error', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const deleteProject = async (id) => {
    showConfirm('Delete Project', 'This project and its image will be permanently removed. Continue?', async () => {
      try {
        const res = await fetch(`${API_BASE}/works/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          setProjects(safeProjects.filter(p => (p._id || p.id) !== id));
          showToast('Project deleted');
        }
      } catch (err) { console.error(err); }
      setConfirmDialog(null);
    });
  };

  // Helper: get avatar color from name
  const getAvatarColor = (name) => {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6'];
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  // Helper: badge class for each status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Contacted': return 'contacted';
      case 'Completed': return 'completed';
      case 'Rejected': return 'rejected';
      default: return 'pending';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'feedbacks', label: 'Feedbacks', icon: MessageSquare, badge: pendingFeedbacks.length },
    { id: 'appointments', label: 'Appointments', icon: Calendar, badge: pendingAppointments.length },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'projects', label: 'Projects', icon: ImageIcon, badge: safeProjects.length }
  ];

  // render appointment card (shared between tabs)
  const renderApptCard = (apt) => {
    const id = apt._id || apt.id;
    const isExpanded = expandedAppt === id;

    return (
      <div key={id} className="admin-card">
        <div className="admin-card-header">
          <div className="admin-card-meta">
            <div className="admin-avatar" style={{ background: getAvatarColor(apt.name) }}>
              {(apt.name || '?')[0].toUpperCase()}
            </div>
            <div>
              <h4>{apt.name}</h4>
              <span>{apt.date ? new Date(apt.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}</span>
            </div>
          </div>
          <span className={`admin-badge ${getStatusBadgeClass(apt.status)}`}>
            {apt.status}
          </span>
        </div>

        <div className="admin-card-info">
          <span>📧 {apt.email}</span>
          <span>📞 {apt.phone}</span>
          {apt.location && <span>📍 {apt.location}</span>}
          {apt.time && <span>🕐 {apt.time}</span>}
        </div>

        <div className="admin-card-body">
          <p style={{ fontStyle: 'normal' }}>{apt.message}</p>
        </div>

        {/* Show note if present */}
        {apt.note && (
          <div className="admin-appt-note" onClick={() => setExpandedAppt(isExpanded ? null : id)} style={{ cursor: 'pointer' }}>
            <div className="admin-note-header">
              <FileText size={14} />
              <strong>Note</strong>
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
            {isExpanded && <p className="admin-note-text">{apt.note}</p>}
          </div>
        )}

        <div className="admin-card-actions">
          {/* Pending → Contacted */}
          {apt.status === 'Pending' && (
            <button className="admin-btn blue" onClick={() => markApptContacted(id)}>
              <CheckCircle size={14} /> Mark Contacted
            </button>
          )}
          {/* Contacted → Rejected or Completed (with note) */}
          {apt.status === 'Contacted' && (
            <>
              <button className="admin-btn danger" onClick={() => openNoteDialog(id, 'Rejected')}>
                <XCircle size={14} /> Reject
              </button>
              <button className="admin-btn success" onClick={() => openNoteDialog(id, 'Completed')}>
                <CheckCircle size={14} /> Complete
              </button>
            </>
          )}
          <button className="admin-btn danger" onClick={() => deleteAppt(id)}>
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h3>Control Panel</h3>
          <p>DevCraft Studio</p>
        </div>

        <nav className="admin-nav">
          {tabs.map(tab => (
            <div
              key={tab.id}
              className={`admin-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
              {tab.badge > 0 && <span className="nav-badge">{tab.badge}</span>}
            </div>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* === OVERVIEW TAB === */}
        {activeTab === 'overview' && (
          <>
            <div className="admin-page-header">
              <h1>Dashboard Overview</h1>
              <p>Welcome back! Here's what's happening with your website.</p>
            </div>

            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div className="admin-stat-icon" style={{ background: '#ede9fe' }}>
                  <MessageSquare size={22} color="#7c3aed" />
                </div>
                <h4>Total Feedbacks</h4>
                <div className="stat-value">{safeFeedbacks.length}</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-icon" style={{ background: '#fef3c7' }}>
                  <AlertCircle size={22} color="#d97706" />
                </div>
                <h4>Pending Review</h4>
                <div className="stat-value">{pendingFeedbacks.length}</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-icon" style={{ background: '#dbeafe' }}>
                  <Calendar size={22} color="#2563eb" />
                </div>
                <h4>Total Appointments</h4>
                <div className="stat-value">{safeAppointments.length}</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-icon" style={{ background: '#dcfce7' }}>
                  <FolderOpen size={22} color="#16a34a" />
                </div>
                <h4>Projects</h4>
                <div className="stat-value">{safeProjects.length}</div>
              </div>
            </div>

            {/* Appointment Summary */}
            <div className="admin-overview-summary">
              <h3 className="admin-summary-title"><Calendar size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />Appointment Summary</h3>
              <div className="admin-summary-row">
                <div className="admin-summary-item">
                  <div className="admin-summary-dot" style={{ background: '#f59e0b' }} />
                  <span>Pending</span>
                  <strong>{pendingAppointments.length}</strong>
                </div>
                <div className="admin-summary-item">
                  <div className="admin-summary-dot" style={{ background: '#3b82f6' }} />
                  <span>Contacted</span>
                  <strong>{contactedAppointments.length}</strong>
                </div>
                <div className="admin-summary-item">
                  <div className="admin-summary-dot" style={{ background: '#ef4444' }} />
                  <span>Rejected</span>
                  <strong>{rejectedAppointments.length}</strong>
                </div>
                <div className="admin-summary-item">
                  <div className="admin-summary-dot" style={{ background: '#22c55e' }} />
                  <span>Completed</span>
                  <strong>{completedAppointments.length}</strong>
                </div>
              </div>
            </div>

            {/* Recent Completed/Rejected with Notes */}
            {[...completedAppointments, ...rejectedAppointments].filter(a => a.note).length > 0 && (
              <div className="admin-overview-notes">
                <h3 className="admin-summary-title"><FileText size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />Recent Notes</h3>
                {[...completedAppointments, ...rejectedAppointments].filter(a => a.note).slice(0, 5).map(apt => (
                  <div key={apt._id || apt.id} className="admin-note-preview-card">
                    <div className="admin-note-preview-header">
                      <div className="admin-card-meta">
                        <div className="admin-avatar" style={{ background: getAvatarColor(apt.name), width: 32, height: 32, fontSize: 13 }}>
                          {(apt.name || '?')[0].toUpperCase()}
                        </div>
                        <div>
                          <h4 style={{ fontSize: '13px' }}>{apt.name}</h4>
                          <span style={{ fontSize: '11px' }}>{apt.email}</span>
                        </div>
                      </div>
                      <span className={`admin-badge ${getStatusBadgeClass(apt.status)}`} style={{ fontSize: '10px', padding: '3px 8px' }}>
                        {apt.status}
                      </span>
                    </div>
                    <p className="admin-note-preview-text">📝 {apt.note}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Actions */}
            {pendingFeedbacks.length > 0 && (
              <div className="admin-card" style={{ borderLeft: '4px solid #f59e0b' }}>
                <div className="admin-card-header">
                  <div className="admin-card-meta">
                    <div className="admin-avatar" style={{ background: '#fef3c7', color: '#d97706', fontSize: '20px' }}>⏳</div>
                    <div>
                      <h4>{pendingFeedbacks.length} feedback{pendingFeedbacks.length > 1 ? 's' : ''} awaiting review</h4>
                      <span>Action required</span>
                    </div>
                  </div>
                  <button className="admin-btn primary" onClick={() => setActiveTab('feedbacks')}>Review Now</button>
                </div>
              </div>
            )}

            {pendingAppointments.length > 0 && (
              <div className="admin-card" style={{ borderLeft: '4px solid #3b82f6' }}>
                <div className="admin-card-header">
                  <div className="admin-card-meta">
                    <div className="admin-avatar" style={{ background: '#dbeafe', color: '#2563eb', fontSize: '20px' }}>📅</div>
                    <div>
                      <h4>{pendingAppointments.length} new appointment{pendingAppointments.length > 1 ? 's' : ''}</h4>
                      <span>Waiting for follow-up</span>
                    </div>
                  </div>
                  <button className="admin-btn blue" onClick={() => setActiveTab('appointments')}>View All</button>
                </div>
              </div>
            )}
          </>
        )}

        {/* === FEEDBACKS TAB === */}
        {activeTab === 'feedbacks' && (
          <>
            <div className="admin-page-header">
              <h1>Feedback Management</h1>
              <p>Review and approve client testimonials for your website.</p>
            </div>

            {safeFeedbacks.length === 0 ? (
              <div className="admin-empty-state">
                <MessageSquare size={48} />
                <h4>No Feedbacks Yet</h4>
                <p>Client feedback submissions will appear here.</p>
              </div>
            ) : (
              safeFeedbacks.map(fb => (
                <div key={fb._id || fb.id} className="admin-card">
                  <div className="admin-card-header">
                    <div className="admin-card-meta">
                      <div className="admin-avatar" style={{ background: getAvatarColor(fb.name) }}>
                        {(fb.name || '?')[0].toUpperCase()}
                      </div>
                      <div>
                        <h4>{fb.name}</h4>
                        <span>{fb.location || fb.role || 'Client'}</span>
                      </div>
                    </div>
                    <span className={`admin-badge ${fb.approved ? 'approved' : 'pending'}`}>
                      {fb.approved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  <div className="admin-card-body">
                    <p>"{fb.message || fb.text}"</p>
                  </div>
                  {fb.ratings && (
                    <div style={{ marginBottom: '12px', color: '#f59e0b', fontSize: '18px', letterSpacing: '2px' }}>
                      {'★'.repeat(Number(fb.ratings || fb.rating) || 5)}{'☆'.repeat(5 - (Number(fb.ratings || fb.rating) || 5))}
                    </div>
                  )}
                  <div className="admin-card-actions">
                    {!fb.approved && (
                      <button className="admin-btn success" onClick={() => approveFeedback(fb._id || fb.id)}>
                        <CheckCircle size={14} /> Approve
                      </button>
                    )}
                    <button className="admin-btn danger" onClick={() => deleteFeedback(fb._id || fb.id)}>
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {/* === APPOINTMENTS TAB === */}
        {activeTab === 'appointments' && (
          <>
            <div className="admin-page-header">
              <h1>Appointment Requests</h1>
              <p>Manage incoming client consultation requests.</p>
            </div>

            {safeAppointments.length === 0 ? (
              <div className="admin-empty-state">
                <Calendar size={48} />
                <h4>No Appointments</h4>
                <p>New appointment requests will appear here.</p>
              </div>
            ) : (
              <>
                {/* Filter tabs */}
                <div className="admin-appt-filters">
                  {['All', 'Pending', 'Contacted', 'Completed', 'Rejected'].map(filter => {
                    const count = filter === 'All' ? safeAppointments.length :
                      safeAppointments.filter(a => a.status === filter).length;
                    return (
                      <button
                        key={filter}
                        className={`admin-appt-filter-btn ${expandedAppt === filter ? 'active' : filter === 'All' && expandedAppt === null ? 'active' : ''}`}
                        onClick={() => setExpandedAppt(expandedAppt === filter ? null : filter)}
                        style={{ '--filter-color': filter === 'Pending' ? '#f59e0b' : filter === 'Contacted' ? '#3b82f6' : filter === 'Completed' ? '#22c55e' : filter === 'Rejected' ? '#ef4444' : '#64748b' }}
                      >
                        {filter} ({count})
                      </button>
                    );
                  })}
                </div>

                {(expandedAppt === null || expandedAppt === 'All' || !['All', 'Pending', 'Contacted', 'Completed', 'Rejected'].includes(expandedAppt)
                  ? safeAppointments
                  : safeAppointments.filter(a => a.status === expandedAppt)
                ).map(apt => renderApptCard(apt))}
              </>
            )}
          </>
        )}

        {/* === PRICING TAB === */}
        {activeTab === 'pricing' && (
          <>
            <div className="admin-page-header">
              <h1>Pricing Plans</h1>
              <p>Update pricing amounts that are displayed on your website.</p>
            </div>

            <div className="admin-pricing-grid">
              {safePricing.map(plan => (
                <div key={plan._id || plan.id} className="admin-pricing-card">
                  <h4>{plan.title}</h4>
                  <p className="pricing-subtitle">{plan.desc}</p>
                  <div className="pricing-current">{plan.prefix}{plan.amount}</div>

                  <div className="admin-input-group">
                    <label>Currency / Prefix</label>
                    <input
                      type="text"
                      value={plan.prefix}
                      onChange={(e) => updatePricePrefix(plan._id || plan.id, e.target.value)}
                    />
                  </div>
                  <div className="admin-input-group">
                    <label>Price Amount</label>
                    <input
                      type="text"
                      value={plan.amount}
                      onChange={(e) => updatePriceAmount(plan._id || plan.id, e.target.value)}
                    />
                  </div>
                  <button className="admin-save-btn" onClick={() => handleSavePricing(plan)}>
                    Save Changes
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* === PROJECTS TAB === */}
        {activeTab === 'projects' && (
          <>
            <div className="admin-page-header">
              <h1>Featured Projects</h1>
              <p>Manage your portfolio projects displayed on the website.</p>
            </div>

            {/* Upload Form */}
            <div className="admin-upload-form">
              <h3><Upload size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />Add New Project</h3>
              <form onSubmit={addProject}>
                <div className="admin-form-grid">
                  <div className="admin-form-field">
                    <label>Project Title</label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                      placeholder="Enter project name"
                      required
                    />
                  </div>
                  <div className="admin-form-field">
                    <label>Project Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      required={!newProject.file}
                    />
                    {isUploading && <span className="admin-upload-status uploading">⏳ Uploading to Cloudinary...</span>}
                    {newProject.file && !isUploading && <span className="admin-upload-status staged">✓ {newProject.file.name} ready</span>}
                  </div>
                  <div className="admin-form-field">
                    <label>Description</label>
                    <input
                      type="text"
                      value={newProject.desc}
                      onChange={e => setNewProject({ ...newProject, desc: e.target.value })}
                      placeholder="Brief project description"
                      required
                    />
                  </div>
                  <div className="admin-form-field">
                    <label>External Link</label>
                    <input
                      type="url"
                      value={newProject.link}
                      onChange={e => setNewProject({ ...newProject, link: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
                <button type="submit" className="admin-submit-btn" disabled={isUploading}>
                  {isUploading ? 'Uploading...' : '+ Add Project'}
                </button>
              </form>
            </div>

            {/* Projects Grid */}
            {safeProjects.length === 0 ? (
              <div className="admin-empty-state">
                <FolderOpen size={48} />
                <h4>No Projects</h4>
                <p>Upload your first project to showcase in the portfolio.</p>
              </div>
            ) : (
              <div className="admin-projects-grid">
                {safeProjects.map(proj => (
                  <div key={proj._id || proj.id} className="admin-project-card">
                    <div className="admin-project-img">
                      <img src={proj.image?.url || proj.img} alt={proj.title} />
                    </div>
                    <div className="admin-project-info">
                      <h4>{proj.title}</h4>
                      <p>{proj.description || proj.desc}</p>
                      <button className="admin-btn danger" style={{ width: '100%', justifyContent: 'center' }} onClick={() => deleteProject(proj._id || proj.id)}>
                        <Trash2 size={14} /> Delete Project
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Toast */}
      {toast && <div className={`admin-toast ${toast.type}`}>{toast.message}</div>}

      {/* Confirm Dialog */}
      {confirmDialog && (
        <div className="admin-confirm-overlay" onClick={() => setConfirmDialog(null)}>
          <div className="admin-confirm-dialog" onClick={e => e.stopPropagation()}>
            <h3>{confirmDialog.title}</h3>
            <p>{confirmDialog.message}</p>
            <div className="admin-confirm-actions">
              <button className="admin-btn outline" onClick={() => setConfirmDialog(null)}>Cancel</button>
              <button className="admin-btn danger" onClick={confirmDialog.onConfirm}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Note Dialog (for Reject / Complete) */}
      {noteDialog && (
        <div className="admin-confirm-overlay" onClick={() => setNoteDialog(null)}>
          <div className="admin-note-dialog" onClick={e => e.stopPropagation()}>
            <h3>
              {noteDialog.action === 'Rejected' ? (
                <><XCircle size={20} color="#ef4444" style={{ verticalAlign: 'middle', marginRight: '8px' }} />Reject Appointment</>
              ) : (
                <><CheckCircle size={20} color="#22c55e" style={{ verticalAlign: 'middle', marginRight: '8px' }} />Complete Appointment</>
              )}
            </h3>
            <p style={{ color: '#64748b', marginBottom: '16px' }}>
              {noteDialog.action === 'Rejected'
                ? 'Add a note explaining why this appointment was rejected.'
                : 'Add a summary note about the completed appointment.'
              }
            </p>
            <textarea
              className="admin-note-textarea"
              rows="4"
              placeholder={noteDialog.action === 'Rejected' ? 'Reason for rejection...' : 'Completion summary / notes...'}
              value={noteDialog.note}
              onChange={(e) => setNoteDialog({ ...noteDialog, note: e.target.value })}
              autoFocus
            />
            <div className="admin-confirm-actions">
              <button className="admin-btn outline" onClick={() => setNoteDialog(null)}>Cancel</button>
              <button
                className={`admin-btn ${noteDialog.action === 'Rejected' ? 'danger' : 'success'}`}
                onClick={submitStatusWithNote}
              >
                {noteDialog.action === 'Rejected' ? 'Reject' : 'Mark Complete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
