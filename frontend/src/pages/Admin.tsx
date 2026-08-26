import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Clock3, 
  Search, 
  Filter, 
  RefreshCw, 
  Lock, 
  DollarSign, 
  MessageSquare, 
  LogOut,
  ExternalLink,
  ChevronDown,
  Settings,
  MapPin,
  Building
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { fetchBookings, updateBookingStatus, fetchContactInquiries, loginAdmin } from '../services/api';

export const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'bookings' | 'inquiries' | 'settings'>('bookings');
  const [bookings, setBookings] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [businessSettings, setBusinessSettings] = useState(() => {
    const saved = localStorage.getItem('canguruber_business_settings');
    return saved ? JSON.parse(saved) : {
      phone: '0412 345 678',
      email: 'info@canguruber.com.au',
      address: '124 Botany Rd, Mascot NSW 2020',
      openingHours: 'Mon - Sun: 7:00 AM - 7:00 PM'
    };
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Security Credentials State
  const [adminCreds, setAdminCreds] = useState(() => {
    const saved = localStorage.getItem('canguruber_admin_creds');
    return saved ? JSON.parse(saved) : { username: 'admin', password: 'admin123' };
  });
  const [newUsername, setNewUsername] = useState(adminCreds.username);
  const [newPassword, setNewPassword] = useState(adminCreds.password);
  const [credsSaved, setCredsSaved] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('canguruber_admin_token');
    if (savedToken) {
      setIsAuthenticated(true);
      loadDashboardData();
    }
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('canguruber_business_settings', JSON.stringify(businessSettings));
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 4000);
  };

  const handleSaveCreds = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { username: newUsername, password: newPassword };
    setAdminCreds(updated);
    localStorage.setItem('canguruber_admin_creds', JSON.stringify(updated));
    setCredsSaved(true);
    setTimeout(() => setCredsSaved(false), 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    const inputClean = username.trim().toLowerCase();
    const userMatch = inputClean === adminCreds.username.toLowerCase();
    const emailMatch = businessSettings.email && inputClean === businessSettings.email.toLowerCase();

    // Check custom updated admin credentials (by Username OR Email)
    if ((userMatch || emailMatch) && password === adminCreds.password) {
      setAuthLoading(false);
      localStorage.setItem('canguruber_admin_token', 'token_' + Date.now());
      setIsAuthenticated(true);
      loadDashboardData();
      return;
    }

    const res = await loginAdmin(username, password);
    setAuthLoading(false);
    if (res.success && res.token) {
      localStorage.setItem('canguruber_admin_token', res.token);
      setIsAuthenticated(true);
      loadDashboardData();
    } else {
      setAuthError(`Invalid admin credentials. Login with username (${adminCreds.username}) or business email (${businessSettings.email}).`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('canguruber_admin_token');
    setIsAuthenticated(false);
  };

  const loadDashboardData = async () => {
    setLoading(true);
    const [bData, iData] = await Promise.all([
      fetchBookings(),
      fetchContactInquiries()
    ]);
    setBookings(bData);
    setInquiries(iData);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const res = await updateBookingStatus(id, newStatus);
    if (res.success) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesFilter = statusFilter === 'all' || (b.status || 'confirmed') === statusFilter;
    const matchesSearch = searchQuery === '' || 
      b.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone?.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const totalBookings = bookings.length;
  const confirmedCount = bookings.filter(b => (b.status || 'confirmed') === 'confirmed').length;
  const pendingInquiriesCount = inquiries.length;
  const estimatedRevenue = confirmedCount * 95;

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        <PageHeader 
          tag="SECURITY CHECK"
          title="INSTRUCTOR & ADMIN PORTAL LOGIN."
          subtitle="Access the Canguruber Driving School booking dispatch system and student record manager."
          breadcrumb="Admin Login"
        />

        <section className="section-padding">
          <div className="container" style={{ maxWidth: '480px' }}>
            <div className="admin-login-card aura-card dark-theme">
              <div className="login-header">
                <div className="shield-icon-badge">
                  <Lock size={28} />
                </div>
                <h3>Instructor Portal Access</h3>
                <p>Sign in with your authorized admin credentials.</p>
              </div>

              {authError && (
                <div className="auth-error-box">
                  <XCircle size={16} />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="admin-form">
                <div className="form-group">
                  <label className="form-label" style={{ color: '#FFF' }}>Admin Username or Email *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Username or info@canguruber.com.au"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#FFF' }}>Password</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  disabled={authLoading}
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  {authLoading ? 'AUTHENTICATING...' : 'LOGIN TO ADMIN DASHBOARD'}
                </Button>
              </form>

              <div className="demo-credentials-note">
                <strong>Demo Access Credentials:</strong>
                <code>Username: admin | Password: admin123</code>
              </div>
            </div>
          </div>
        </section>

        <style>{`
          .admin-login-card {
            padding: 2.5rem;
            border-radius: var(--radius-xl);
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }
          .shield-icon-badge {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: rgba(210, 176, 76, 0.2);
            color: var(--accent-gold);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
          }
          .login-header h3 {
            font-size: 1.6rem;
            color: #FFFFFF;
            margin-bottom: 0.35rem;
          }
          .login-header p {
            font-size: 0.9rem;
            color: #94A3B8;
          }
          .auth-error-box {
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.4);
            color: #F87171;
            padding: 0.75rem 1rem;
            border-radius: var(--radius-md);
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .demo-credentials-note {
            background: rgba(255, 255, 255, 0.06);
            padding: 1rem;
            border-radius: var(--radius-md);
            font-size: 0.8rem;
            color: #94A3B8;
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
          }
          .demo-credentials-note code {
            color: var(--accent-gold);
            font-weight: 700;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">
      <PageHeader 
        tag="LIVE MANAGEMENT SYSTEM"
        title="INSTRUCTOR DISPATCH DASHBOARD."
        subtitle="Manage student driving appointments, review contact form inquiries, and track revenue stats."
        breadcrumb="Admin Dashboard"
      />

      <section className="section-padding" style={{ paddingTop: '1.5rem' }}>
        <div className="container">
          {/* Dashboard Header Bar */}
          <div className="dashboard-top-bar aura-card" style={{ padding: '1.25rem 2rem', marginBottom: '1.75rem' }}>
            <div className="admin-user-info">
              <div className="admin-avatar">
                <ShieldCheck size={20} />
              </div>
              <div>
                <strong className="admin-name">Head Driving Instructor (Admin)</strong>
                <span className="admin-role-tag">NSW Authorized • System Dispatch</span>
              </div>
            </div>

            <div className="top-bar-actions">
              <Button onClick={loadDashboardData} variant="outline" size="sm" icon={<RefreshCw size={14} />}>
                Refresh API
              </Button>
              <a href="http://localhost:5000/api-docs" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                Swagger Docs <ExternalLink size={12} />
              </a>
              <Button onClick={handleLogout} variant="dark" size="sm" icon={<LogOut size={14} />}>
                Logout
              </Button>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="metrics-grid">
            <div className="metric-card aura-card">
              <div className="metric-icon gold"><Calendar size={22} /></div>
              <div className="metric-data">
                <span className="metric-label">Total Bookings</span>
                <strong className="metric-value">{totalBookings}</strong>
              </div>
            </div>

            <div className="metric-card aura-card">
              <div className="metric-icon green"><CheckCircle2 size={22} /></div>
              <div className="metric-data">
                <span className="metric-label">Confirmed Sessions</span>
                <strong className="metric-value">{confirmedCount}</strong>
              </div>
            </div>

            <div className="metric-card aura-card">
              <div className="metric-icon blue"><MessageSquare size={22} /></div>
              <div className="metric-data">
                <span className="metric-label">Contact Inquiries</span>
                <strong className="metric-value">{pendingInquiriesCount}</strong>
              </div>
            </div>

            <div className="metric-card aura-card">
              <div className="metric-icon purple"><DollarSign size={22} /></div>
              <div className="metric-data">
                <span className="metric-label">Est. Revenue</span>
                <strong className="metric-value">${estimatedRevenue} AUD</strong>
              </div>
            </div>
          </div>

          {/* Main Dashboard Navigation Tabs */}
          <div className="admin-tabs-row">
            <button 
              className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              <Calendar size={16} />
              <span>Bookings Manager ({bookings.length})</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
              onClick={() => setActiveTab('inquiries')}
            >
              <MessageSquare size={16} />
              <span>Student Inquiries ({inquiries.length})</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={16} />
              <span>Business Contact & Address Settings</span>
            </button>
          </div>

          {/* TAB 1: BOOKINGS MANAGER */}
          {activeTab === 'bookings' && (
            <div className="dashboard-content-box aura-card">
              <div className="table-controls-bar">
                <div className="search-input-wrap">
                  <Search size={16} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search by student name, email, phone, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-input search-input"
                  />
                </div>

                <div className="filter-pills">
                  {['all', 'confirmed', 'pending', 'cancelled'].map(status => (
                    <button 
                      key={status} 
                      className={`filter-chip ${statusFilter === status ? 'active' : ''}`}
                      onClick={() => setStatusFilter(status)}
                    >
                      {status.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {filteredBookings.length === 0 ? (
                <div className="empty-state-box">
                  <Calendar size={40} className="empty-icon" />
                  <h4>No Bookings Found</h4>
                  <p>There are no bookings matching your search query or status filter.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>Booking ID & Status</th>
                        <th>Student Information</th>
                        <th>Service / Package</th>
                        <th>Location & Date</th>
                        <th>Action / Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((b) => {
                        const status = b.status || 'confirmed';
                        return (
                          <tr key={b.id}>
                            <td>
                              <div className="id-cell">
                                <strong className="booking-ref-id">{b.id}</strong>
                                <span className={`status-badge ${status}`}>
                                  {status.toUpperCase()}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="student-cell">
                                <strong className="student-name">{b.fullName || 'Learner Driver'}</strong>
                                <span className="student-sub">{b.phone}</span>
                                <span className="student-sub">{b.email}</span>
                                <span className="licence-tag">{b.licenceType || 'NSW Learner'}</span>
                              </div>
                            </td>
                            <td>
                              <div className="service-cell">
                                <strong className="service-title">{b.serviceId || 'Driving Lesson'}</strong>
                                <span className="trans-tag">{b.transmission || 'Automatic'} Vehicle</span>
                              </div>
                            </td>
                            <td>
                              <div className="datetime-cell">
                                <strong>{b.date}</strong>
                                <span>{b.timeSlot}</span>
                                <span className="loc-tag">{b.locationId || 'Botany Test Centre'}</span>
                              </div>
                            </td>
                            <td>
                              <div className="action-buttons-cell">
                                <button 
                                  onClick={() => handleStatusChange(b.id, 'confirmed')} 
                                  className={`status-btn confirm ${status === 'confirmed' ? 'active' : ''}`}
                                  title="Mark Confirmed"
                                >
                                  Confirm
                                </button>
                                <button 
                                  onClick={() => handleStatusChange(b.id, 'pending')} 
                                  className={`status-btn pending ${status === 'pending' ? 'active' : ''}`}
                                  title="Mark Pending"
                                >
                                  Pending
                                </button>
                                <button 
                                  onClick={() => handleStatusChange(b.id, 'cancelled')} 
                                  className={`status-btn cancel ${status === 'cancelled' ? 'active' : ''}`}
                                  title="Mark Cancelled"
                                >
                                  Cancel
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="dashboard-content-box aura-card">
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>Submitted Student Messages</h3>
              {inquiries.length === 0 ? (
                <div className="empty-state-box">
                  <MessageSquare size={40} className="empty-icon" />
                  <h4>No Contact Inquiries</h4>
                  <p>Students have not submitted any messages yet.</p>
                </div>
              ) : (
                <div className="inquiries-list-grid">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="inquiry-card">
                      <div className="inquiry-header">
                        <div>
                          <strong>{inq.name}</strong>
                          <span className="inq-sub">{inq.email} • {inq.phone || 'No Phone'}</span>
                        </div>
                        <span className="inq-date">{inq.createdAt?.slice(0, 10) || 'Recent'}</span>
                      </div>
                      <p className="inquiry-msg">"{inq.message}"</p>
                      <div className="inquiry-footer">
                        <span className="pill-badge">{inq.serviceInterest || 'General Inquiry'}</span>
                        <a href={`mailto:${inq.email}`} className="btn btn-outline btn-sm">
                          Reply via Email
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BUSINESS SETTINGS */}
          {activeTab === 'settings' && (
            <div className="dashboard-content-box aura-card">
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>Edit Business Contact & Location Details</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.75rem' }}>
                Update your official driving school phone number, email address, headquarters location, and operating hours.
              </p>

              {settingsSaved && (
                <div className="settings-saved-banner">
                  <CheckCircle2 size={18} />
                  <span>Business contact details successfully saved and updated!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="settings-form" style={{ maxWidth: '640px' }}>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Official Mobile / Phone Number *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. 0412 345 678"
                      value={businessSettings.phone}
                      onChange={(e) => setBusinessSettings({ ...businessSettings, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Official Business Email *</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder="e.g. info@canguruber.com.au"
                      value={businessSettings.email}
                      onChange={(e) => setBusinessSettings({ ...businessSettings, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Headquarters / Main Branch Address *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 124 Botany Rd, Mascot NSW 2020"
                    value={businessSettings.address}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, address: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Operating / Business Hours *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Mon - Sun: 7:00 AM - 7:00 PM"
                    value={businessSettings.openingHours}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, openingHours: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" variant="yellow" size="lg" icon={<CheckCircle2 size={18} />} style={{ marginTop: '1rem' }}>
                  SAVE BUSINESS SETTINGS
                </Button>
              </form>

              <hr style={{ margin: '2.5rem 0', borderColor: 'var(--border-light)' }} />

              {/* Admin Security Password Manager */}
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>🔐 Security Settings: Change Admin ID & Password</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.75rem' }}>
                Change your Admin Login Username ID and Password used to access this private dashboard portal.
              </p>

              {credsSaved && (
                <div className="settings-saved-banner">
                  <CheckCircle2 size={18} />
                  <span>Admin Username & Password successfully updated! Use your new credentials next time.</span>
                </div>
              )}

              <form onSubmit={handleSaveCreds} className="creds-form" style={{ maxWidth: '640px' }}>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Admin Username / ID *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. admin"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">New Admin Password *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. myNewSecret123"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" variant="dark" size="lg" icon={<Lock size={16} />} style={{ marginTop: '1rem' }}>
                  UPDATE ADMIN USERNAME & PASSWORD
                </Button>
              </form>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .settings-saved-banner {
          background: rgba(22, 163, 74, 0.12);
          border: 1px solid rgba(22, 163, 74, 0.4);
          color: #16A34A;
          padding: 0.85rem 1.15rem;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }

        .dashboard-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .admin-user-info {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .admin-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #07131D;
          color: var(--accent-gold);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .admin-name {
          font-size: 1.1rem;
          display: block;
        }
        .admin-role-tag {
          font-size: 0.75rem;
          color: #64748B;
        }
        .top-bar-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 2rem;
        }
        @media (max-width: 900px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .metric-card {
          padding: 1.35rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .metric-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .metric-icon.gold { background: rgba(210, 176, 76, 0.15); color: #B38E2A; }
        .metric-icon.green { background: rgba(22, 163, 74, 0.15); color: #16A34A; }
        .metric-icon.blue { background: rgba(37, 99, 235, 0.15); color: #2563EB; }
        .metric-icon.purple { background: rgba(147, 51, 234, 0.15); color: #9333EA; }
        
        .metric-label {
          font-size: 0.775rem;
          color: #64748B;
          display: block;
          margin-bottom: 0.15rem;
        }
        .metric-value {
          font-size: 1.4rem;
          font-family: var(--font-display);
          font-weight: 900;
        }

        .admin-tabs-row {
          display: flex;
          gap: 0.85rem;
          margin-bottom: 1.25rem;
        }
        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-full);
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.875rem;
          color: #07131D;
          transition: all 0.2s;
        }
        .tab-btn.active {
          background: #07131D;
          color: #FFFFFF;
          border-color: #07131D;
        }

        .dashboard-content-box {
          padding: 2rem;
        }
        .table-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .search-input-wrap {
          position: relative;
          width: 340px;
        }
        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94A3B8;
        }
        .search-input {
          padding-left: 2.6rem !important;
        }
        .filter-pills {
          display: flex;
          gap: 0.5rem;
        }
        .filter-chip {
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
          background: #FAFAF8;
          font-size: 0.75rem;
          font-weight: 800;
          color: #64748B;
        }
        .filter-chip.active {
          background: var(--accent-gold);
          color: #07131D;
          border-color: var(--accent-gold);
        }

        .table-responsive {
          width: 100%;
          overflow-x: auto;
        }
        .admin-data-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .admin-data-table th {
          font-family: var(--font-display);
          font-size: 0.775rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #64748B;
          padding: 0.85rem 1rem;
          border-bottom: 2px solid var(--border-light);
        }
        .admin-data-table td {
          padding: 1.15rem 1rem;
          border-bottom: 1px solid var(--border-light);
          vertical-align: top;
        }
        .booking-ref-id {
          display: block;
          font-size: 0.95rem;
          color: #07131D;
        }
        .status-badge {
          display: inline-block;
          font-size: 0.675rem;
          font-weight: 800;
          padding: 0.15rem 0.55rem;
          border-radius: var(--radius-full);
          margin-top: 0.35rem;
        }
        .status-badge.confirmed { background: rgba(22, 163, 74, 0.15); color: #16A34A; }
        .status-badge.pending { background: rgba(210, 176, 76, 0.2); color: #B38E2A; }
        .status-badge.cancelled { background: rgba(239, 68, 68, 0.15); color: #EF4444; }

        .student-name {
          display: block;
          font-size: 0.95rem;
        }
        .student-sub {
          display: block;
          font-size: 0.775rem;
          color: #64748B;
        }
        .licence-tag {
          font-size: 0.7rem;
          font-weight: 700;
          color: #07131D;
          background: #F1F5F9;
          padding: 0.1rem 0.45rem;
          border-radius: 4px;
          margin-top: 0.35rem;
          display: inline-block;
        }

        .service-title {
          display: block;
          font-size: 0.9rem;
        }
        .trans-tag {
          font-size: 0.75rem;
          color: #64748B;
        }
        .datetime-cell strong {
          display: block;
          font-size: 0.9rem;
        }
        .datetime-cell span {
          display: block;
          font-size: 0.775rem;
          color: #64748B;
        }

        .action-buttons-cell {
          display: flex;
          gap: 0.35rem;
        }
        .status-btn {
          font-size: 0.725rem;
          font-weight: 700;
          padding: 0.35rem 0.65rem;
          border-radius: 6px;
          border: 1px solid var(--border-light);
          background: #FAFAF8;
          cursor: pointer;
        }
        .status-btn.confirm.active { background: #16A34A; color: #FFF; border-color: #16A34A; }
        .status-btn.pending.active { background: #B38E2A; color: #FFF; border-color: #B38E2A; }
        .status-btn.cancel.active { background: #EF4444; color: #FFF; border-color: #EF4444; }

        .empty-state-box {
          text-align: center;
          padding: 3.5rem 1rem;
        }
        .empty-icon {
          color: #94A3B8;
          margin-bottom: 0.85rem;
        }
        .inquiries-list-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 768px) {
          .inquiries-list-grid { grid-template-columns: 1fr; }
        }
        .inquiry-card {
          background: #FAFAF8;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 1.35rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .inquiry-header {
          display: flex;
          justify-content: space-between;
        }
        .inq-sub {
          display: block;
          font-size: 0.775rem;
          color: #64748B;
        }
        .inq-date {
          font-size: 0.75rem;
          color: #94A3B8;
        }
        .inquiry-msg {
          font-size: 0.875rem;
          color: #334155;
          font-style: italic;
          line-height: 1.5;
        }
        .inquiry-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
};
