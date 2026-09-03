import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Users,
  Car,
  Award,
  LogOut,
  RefreshCw,
  Eye,
  TrendingUp,
  FileText,
  UserCheck,
  Settings,
  Building,
  Phone,
  Mail
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { 
  loginUser, 
  fetchBookings, 
  updateBookingStatus, 
  fetchContactInquiries,
  fetchAdminStats,
  fetchInstructors,
  toggleInstructorStatus,
  fetchVehicles,
  toggleVehicleStatus,
  fetchAdminStudents,
  fetchStudentProgress,
  fetchSchoolSettings,
  updateSchoolSettings
} from '../services/api';

export const Admin: React.FC = () => {
  const { user, token, isAuthenticated, login, logout } = useAuth();

  // Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [submittingLogin, setSubmittingLogin] = useState(false);

  // Admin Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'instructors' | 'vehicles' | 'students' | 'inquiries' | 'settings'>('overview');

  // Admin Data States
  const [stats, setStats] = useState<any | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);

  // School Settings States (Driving School Owner Customization)
  const [schoolName, setSchoolName] = useState('Drivinity Driving Academy');
  const [schoolPhone, setSchoolPhone] = useState('1300 855 374');
  const [schoolEmail, setSchoolEmail] = useState('contact@drivinity.com');
  const [schoolAddress, setSchoolAddress] = useState('Suite 100, Innovation Way, Sydney NSW Australia');
  const [operatingHours, setOperatingHours] = useState('Mon – Sun: 7:00 AM – 7:00 PM');
  const [serviceArea, setServiceArea] = useState('Greater Sydney & Surrounding NSW Service Centres');
  const [tagline, setTagline] = useState('Get your Australian driver\'s licence with confidence.');
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState<string | null>(null);
  const [settingsError, setSettingsError] = useState<string | null>(null);

  // Filter & Modal States
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedStudentProgress, setSelectedStudentProgress] = useState<{ student: any; progress: any[] } | null>(null);

  // Load Admin Data on Authentication
  const loadAdminData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [statsRes, bookingsRes, instructorsRes, vehiclesRes, studentsRes, inquiriesRes, settingsRes] = await Promise.all([
        fetchAdminStats(token),
        fetchBookings(undefined, token),
        fetchInstructors(token),
        fetchVehicles(token),
        fetchAdminStudents(token),
        fetchContactInquiries(),
        fetchSchoolSettings()
      ]);

      setStats(statsRes);
      setBookings(bookingsRes || []);
      setInstructors(instructorsRes || []);
      setVehicles(vehiclesRes || []);
      setStudents(studentsRes || []);
      setInquiries(inquiriesRes || []);

      if (settingsRes) {
        if (settingsRes.schoolName) setSchoolName(settingsRes.schoolName);
        if (settingsRes.phone) setSchoolPhone(settingsRes.phone);
        if (settingsRes.email) setSchoolEmail(settingsRes.email);
        if (settingsRes.address) setSchoolAddress(settingsRes.address);
        if (settingsRes.operatingHours) setOperatingHours(settingsRes.operatingHours);
        if (settingsRes.serviceArea) setServiceArea(settingsRes.serviceArea);
        if (settingsRes.tagline) setTagline(settingsRes.tagline);
      }
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle Save School Settings
  const handleSaveSchoolSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSavingSettings(true);
    setSettingsSuccess(null);
    setSettingsError(null);

    try {
      const res = await updateSchoolSettings({
        schoolName,
        phone: schoolPhone,
        email: schoolEmail,
        address: schoolAddress,
        operatingHours,
        serviceArea,
        tagline
      }, token);

      setSavingSettings(false);
      if (res.success) {
        setSettingsSuccess('Driving school details updated successfully! Live website values updated.');
        // Persist to local storage for instant sync across tabs
        const currentSaved = localStorage.getItem('drivinity_business_settings');
        const updated = currentSaved ? JSON.parse(currentSaved) : {};
        localStorage.setItem('drivinity_business_settings', JSON.stringify({
          ...updated,
          schoolName,
          phone: schoolPhone,
          email: schoolEmail,
          address: schoolAddress
        }));
        setTimeout(() => setSettingsSuccess(null), 5000);
      } else {
        setSettingsError(res.error || 'Failed to update school settings.');
      }
    } catch (err: any) {
      setSavingSettings(false);
      setSettingsError(err.message || 'Error updating settings.');
    }
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      loadAdminData();
    }
  }, [isAuthenticated, token]);

  // Handle Real Backend Admin Authentication (POST /api/auth/login)
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setSubmittingLogin(true);

    try {
      const res = await loginUser(email, password);
      setSubmittingLogin(false);

      if (!res.success || !res.token) {
        setLoginError(res.error || 'Authentication failed. Invalid email or password.');
        return;
      }

      if (res.user?.role !== 'admin' && res.user?.role !== 'instructor') {
        setLoginError('Access denied: Admin or Instructor privileges required for staff portal.');
        return;
      }

      login(res.token, res.user);
    } catch (err: any) {
      setSubmittingLogin(false);
      setLoginError(err.message || 'Network error authenticating against server.');
    }
  };

  // Handle Status Toggles
  const handleStatusChange = async (id: string, newStatus: string) => {
    if (!token) return;
    const res = await updateBookingStatus(id, newStatus, token);
    if (res.success) {
      loadAdminData();
    } else {
      alert(`Failed to update booking status: ${res.error || 'Unknown error'}`);
    }
  };

  const handleToggleInstructor = async (id: string, currentStatus: boolean) => {
    if (!token) return;
    const res = await toggleInstructorStatus(id, !currentStatus, token);
    if (res.success) {
      loadAdminData();
    } else {
      alert(`Failed to update instructor status: ${res.error || 'Unknown error'}`);
    }
  };

  const handleToggleVehicle = async (id: string, currentStatus: boolean) => {
    if (!token) return;
    const res = await toggleVehicleStatus(id, !currentStatus, token);
    if (res.success) {
      loadAdminData();
    } else {
      alert(`Failed to update vehicle status: ${res.error || 'Unknown error'}`);
    }
  };

  const handleViewStudentProgress = async (student: any) => {
    if (!token) return;
    const progressData = await fetchStudentProgress(student.id, token);
    setSelectedStudentProgress({ student, progress: progressData || [] });
  };

  // Filter Bookings
  const filteredBookings = bookings.filter(b => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesSearch = 
      (b.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.id || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Render Unauthenticated Login Screen
  if (!isAuthenticated || !user || (user.role !== 'admin' && user.role !== 'instructor')) {
    return (
      <div className="admin-page">
        <PageHeader 
          tag="STAFF & INSTRUCTOR PORTAL"
          title="ADMINISTRATION LOGIN."
          subtitle="Authenticate against the backend server to access booking schedules, fleet management, and student evaluation matrices."
          breadcrumb="Staff Login"
        />

        <section className="section-padding">
          <div className="container" style={{ maxWidth: '480px' }}>
            <div className="aura-card" style={{ padding: '2.5rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                <ShieldCheck size={48} style={{ color: 'var(--accent-gold)', marginBottom: '0.75rem' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Staff Portal Authentication</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
                  Enter your registered instructor or admin credentials.
                </p>
              </div>

              {loginError && (
                <div className="error-alert-box">
                  <AlertCircle size={18} />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="admin-login-form">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="admin@drivinity.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" variant="yellow" size="lg" disabled={submittingLogin} style={{ width: '100%', marginTop: '1rem' }}>
                  {submittingLogin ? 'VERIFYING CREDENTIALS...' : 'LOGIN TO ADMIN PANEL'}
                </Button>
              </form>
            </div>
          </div>
        </section>

        <style>{`
          .error-alert-box {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid #EF4444;
            color: #EF4444;
            padding: 0.85rem 1rem;
            border-radius: var(--radius-md);
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 1.25rem;
          }
          .admin-login-form {
            display: flex;
            flex-direction: column;
            gap: 1.15rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <PageHeader 
        tag={`STAFF PORTAL • LOGGED IN AS: ${(user.name || user.fullName).toUpperCase()} (${user.role.toUpperCase()})`}
        title="DRIVING ACADEMY MANAGEMENT."
        subtitle="Manage driving lesson bookings, instructor schedules, dual-control vehicles, and student evaluations."
        breadcrumb="Staff Operations"
      />

      <section className="section-padding">
        <div className="container">
          {/* Admin Header Navigation Toolbar */}
          <div className="admin-toolbar aura-card">
            <div className="tabs-row">
              <button 
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <TrendingUp size={16} /> Overview
              </button>
              <button 
                className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
                onClick={() => setActiveTab('bookings')}
              >
                <Calendar size={16} /> Bookings ({bookings.length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'instructors' ? 'active' : ''}`}
                onClick={() => setActiveTab('instructors')}
              >
                <UserCheck size={16} /> Instructors ({instructors.length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'vehicles' ? 'active' : ''}`}
                onClick={() => setActiveTab('vehicles')}
              >
                <Car size={16} /> Fleet ({vehicles.length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
                onClick={() => setActiveTab('students')}
              >
                <Users size={16} /> Students ({students.length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
                onClick={() => setActiveTab('inquiries')}
              >
                <FileText size={16} /> Inquiries ({inquiries.length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings size={16} /> School Settings
              </button>
            </div>

            <div className="toolbar-actions">
              <Button onClick={loadAdminData} variant="outline" size="sm" icon={<RefreshCw size={14} />}>
                Refresh
              </Button>
              <Button onClick={logout} variant="outline" size="sm" icon={<LogOut size={14} />}>
                Logout
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="aura-card" style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
              <Clock size={32} className="spinning" style={{ marginBottom: '1rem', color: 'var(--accent-gold)' }} />
              <p>Fetching admin management data from server...</p>
            </div>
          ) : (
            <>
              {/* TAB 1: OVERVIEW DASHBOARD */}
              {activeTab === 'overview' && (
                <div className="tab-content">
                  {/* Dynamic User Profile Greeting Banner */}
                  <div className="aura-card" style={{ padding: '1.5rem 2rem', marginBottom: '1.5rem', background: '#07131D', color: '#FFFFFF' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                      <div>
                        <h3 style={{ color: 'var(--accent-gold)', margin: 0, fontSize: '1.35rem' }}>
                          Welcome back, {user.name || user.fullName}!
                        </h3>
                        <p style={{ color: '#94A3B8', margin: '0.35rem 0 0 0', fontSize: '0.9rem' }}>
                          Authenticated as <strong>{user.email}</strong> • Access Role: <span className="tag-pill" style={{ color: 'var(--accent-gold)', borderColor: 'var(--accent-gold)', background: 'transparent' }}>{user.role.toUpperCase()}</span>
                        </p>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                        User ID: <code>{user.id}</code>
                      </div>
                    </div>
                  </div>

                  <div className="stats-cards-grid">
                    <div className="stat-card aura-card">
                      <div className="stat-icon-wrap"><Calendar size={22} /></div>
                      <div>
                        <span className="stat-label">Bookings Today</span>
                        <strong className="stat-value">{stats?.bookingsToday ?? 0}</strong>
                      </div>
                    </div>

                    <div className="stat-card aura-card">
                      <div className="stat-icon-wrap"><TrendingUp size={22} /></div>
                      <div>
                        <span className="stat-label">Bookings This Week</span>
                        <strong className="stat-value">{stats?.bookingsThisWeek ?? 0}</strong>
                      </div>
                    </div>

                    <div className="stat-card aura-card">
                      <div className="stat-icon-wrap"><Users size={22} /></div>
                      <div>
                        <span className="stat-label">Active Students</span>
                        <strong className="stat-value">{stats?.activeStudents ?? 0}</strong>
                      </div>
                    </div>

                    <div className="stat-card aura-card">
                      <div className="stat-icon-wrap"><UserCheck size={22} /></div>
                      <div>
                        <span className="stat-label">Active Instructors</span>
                        <strong className="stat-value">{stats?.activeInstructors ?? 0}</strong>
                      </div>
                    </div>

                    <div className="stat-card aura-card">
                      <div className="stat-icon-wrap"><Car size={22} /></div>
                      <div>
                        <span className="stat-label">Active Fleet Vehicles</span>
                        <strong className="stat-value">{stats?.activeVehicles ?? 0}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Booking Status Breakdown Chart Box */}
                  <div className="aura-card" style={{ padding: '2rem', marginTop: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Booking Status Overview</h3>
                    <div className="status-bars-grid">
                      <div className="status-bar-item">
                        <div className="status-label-row">
                          <span className="green">Confirmed Bookings</span>
                          <strong>{stats?.statusBreakdown?.confirmed ?? 0}</strong>
                        </div>
                        <div className="bar-bg"><div className="bar-fill green" style={{ width: `${stats?.statusBreakdown?.confirmed ? Math.min(100, stats.statusBreakdown.confirmed * 20) : 0}%` }} /></div>
                      </div>

                      <div className="status-bar-item">
                        <div className="status-label-row">
                          <span className="gold">Pending Approval</span>
                          <strong>{stats?.statusBreakdown?.pending ?? 0}</strong>
                        </div>
                        <div className="bar-bg"><div className="bar-fill gold" style={{ width: `${stats?.statusBreakdown?.pending ? Math.min(100, stats.statusBreakdown.pending * 20) : 0}%` }} /></div>
                      </div>

                      <div className="status-bar-item">
                        <div className="status-label-row">
                          <span className="red">Cancelled</span>
                          <strong>{stats?.statusBreakdown?.cancelled ?? 0}</strong>
                        </div>
                        <div className="bar-bg"><div className="bar-fill red" style={{ width: `${stats?.statusBreakdown?.cancelled ? Math.min(100, stats.statusBreakdown.cancelled * 20) : 0}%` }} /></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: BOOKINGS LIST */}
              {activeTab === 'bookings' && (
                <div className="tab-content">
                  <div className="filter-controls-bar aura-card" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
                    <div className="search-wrap">
                      <Search size={16} className="search-icon" />
                      <input 
                        type="text" 
                        className="form-input search-input" 
                        placeholder="Search student name, email, or booking ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <div className="filter-group">
                      <Filter size={16} />
                      <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="all">All Booking Statuses</option>
                        <option value="confirmed">Confirmed Only</option>
                        <option value="pending">Pending Only</option>
                        <option value="cancelled">Cancelled Only</option>
                      </select>
                    </div>
                  </div>

                  {filteredBookings.length === 0 ? (
                    <div className="aura-card" style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
                      <p>No bookings match the selected criteria.</p>
                    </div>
                  ) : (
                    <div className="admin-table-container aura-card">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Ref ID & Date</th>
                            <th>Student & Contact</th>
                            <th>Transmission & Service</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredBookings.map((b) => (
                            <tr key={b.id}>
                              <td>
                                <strong>{b.id}</strong>
                                <span className="td-sub">{b.date} @ {b.timeSlot}</span>
                              </td>
                              <td>
                                <strong>{b.fullName || b.full_name}</strong>
                                <span className="td-sub">{b.phone} • {b.email}</span>
                              </td>
                              <td>
                                <strong>{(b.transmission || 'automatic').toUpperCase()}</strong>
                                <span className="td-sub">{b.serviceId || b.service_id || 'Driving Lesson'}</span>
                              </td>
                              <td>
                                <span className={`status-badge ${b.status}`}>{b.status.toUpperCase()}</span>
                              </td>
                              <td>
                                <div className="table-actions">
                                  {b.status !== 'confirmed' && (
                                    <button className="btn-action confirm" onClick={() => handleStatusChange(b.id, 'confirmed')}>
                                      Confirm
                                    </button>
                                  )}
                                  {b.status !== 'cancelled' && (
                                    <button className="btn-action cancel" onClick={() => handleStatusChange(b.id, 'cancelled')}>
                                      Cancel
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: INSTRUCTORS MANAGEMENT */}
              {activeTab === 'instructors' && (
                <div className="tab-content">
                  {instructors.length === 0 ? (
                    <div className="aura-card" style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
                      <p>No instructor accounts found in the database.</p>
                    </div>
                  ) : (
                    <div className="admin-table-container aura-card">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Instructor Name & Email</th>
                            <th>License Number</th>
                            <th>Transmission Types</th>
                            <th>Bookings Today</th>
                            <th>Active Status</th>
                            <th>Toggle</th>
                          </tr>
                        </thead>
                        <tbody>
                          {instructors.map((inst) => (
                            <tr key={inst.id}>
                              <td>
                                <strong>{inst.fullName}</strong>
                                <span className="td-sub">{inst.email} • {inst.phone}</span>
                              </td>
                              <td><code>{inst.licenseNumber}</code></td>
                              <td>
                                {(inst.transmissionTypes || []).map((t: string) => (
                                  <span key={t} className="tag-pill">{t}</span>
                                ))}
                              </td>
                              <td><strong>{inst.todayBookingsCount}</strong></td>
                              <td>
                                <span className={`status-badge ${inst.activeStatus ? 'confirmed' : 'cancelled'}`}>
                                  {inst.activeStatus ? 'ACTIVE' : 'INACTIVE'}
                                </span>
                              </td>
                              <td>
                                {user.role === 'admin' ? (
                                  <Button 
                                    onClick={() => handleToggleInstructor(inst.id, inst.activeStatus)}
                                    variant={inst.activeStatus ? 'outline' : 'yellow'} 
                                    size="sm"
                                  >
                                    {inst.activeStatus ? 'DEACTIVATE' : 'ACTIVATE'}
                                  </Button>
                                ) : (
                                  <span className="td-sub" style={{ fontStyle: 'italic' }}>Admin Only</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: VEHICLES FLEET MANAGEMENT */}
              {activeTab === 'vehicles' && (
                <div className="tab-content">
                  {vehicles.length === 0 ? (
                    <div className="aura-card" style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
                      <p>No fleet vehicles registered in database.</p>
                    </div>
                  ) : (
                    <div className="admin-table-container aura-card">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Registration Number</th>
                            <th>Transmission</th>
                            <th>Assigned Instructor</th>
                            <th>Bookings Today</th>
                            <th>Active Status</th>
                            <th>Toggle</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vehicles.map((veh) => (
                            <tr key={veh.id}>
                              <td><strong>{veh.registrationNumber}</strong></td>
                              <td><span className="tag-pill">{veh.transmission.toUpperCase()}</span></td>
                              <td>{veh.instructorName}</td>
                              <td><strong>{veh.todayBookingsCount}</strong></td>
                              <td>
                                <span className={`status-badge ${veh.activeStatus ? 'confirmed' : 'cancelled'}`}>
                                  {veh.activeStatus ? 'ACTIVE' : 'INACTIVE'}
                                </span>
                              </td>
                              <td>
                                {user.role === 'admin' ? (
                                  <Button 
                                    onClick={() => handleToggleVehicle(veh.id, veh.activeStatus)}
                                    variant={veh.activeStatus ? 'outline' : 'yellow'} 
                                    size="sm"
                                  >
                                    {veh.activeStatus ? 'DEACTIVATE' : 'ACTIVATE'}
                                  </Button>
                                ) : (
                                  <span className="td-sub" style={{ fontStyle: 'italic' }}>Admin Only</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: STUDENTS DIRECTORY */}
              {activeTab === 'students' && (
                <div className="tab-content">
                  {students.length === 0 ? (
                    <div className="aura-card" style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
                      <p>No student user accounts found.</p>
                    </div>
                  ) : (
                    <div className="admin-table-container aura-card">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Student Name</th>
                            <th>Email Address</th>
                            <th>Phone Number</th>
                            <th>Total Sessions</th>
                            <th>Evaluation Progress</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.map((std) => (
                            <tr key={std.id}>
                              <td><strong>{std.fullName}</strong></td>
                              <td>{std.email}</td>
                              <td>{std.phone || 'N/A'}</td>
                              <td><strong>{std.totalBookingsCount}</strong></td>
                              <td>
                                <Button 
                                  onClick={() => handleViewStudentProgress(std)} 
                                  variant="outline" 
                                  size="sm" 
                                  icon={<Eye size={14} />}
                                >
                                  View Skills Matrix
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: INQUIRIES */}
              {activeTab === 'inquiries' && (
                <div className="tab-content">
                  {inquiries.length === 0 ? (
                    <div className="aura-card" style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
                      <p>No customer contact form inquiries received yet.</p>
                    </div>
                  ) : (
                    <div className="inquiries-grid">
                      {inquiries.map((inq: any) => (
                        <div key={inq.id} className="inquiry-card aura-card">
                          <div className="inq-header">
                            <strong>{inq.name}</strong>
                            <span className="td-sub">{inq.email} {inq.phone ? `• ${inq.phone}` : ''}</span>
                          </div>
                          <p className="inq-message">"{inq.message}"</p>
                          <span className="inq-date">{new Date(inq.createdAt || inq.created_at || Date.now()).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 7: DRIVING SCHOOL BUSINESS SETTINGS */}
              {activeTab === 'settings' && (
                <div className="tab-content">
                  <div className="aura-card" style={{ padding: '2.5rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="settings-header" style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <Building size={24} style={{ color: 'var(--accent-gold)' }} />
                        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>DRIVING SCHOOL BUSINESS PROFILE</h2>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.92rem' }}>
                        Configure your driving school name, support contact details, primary address, and operating hours. 
                        <em> (Note: Website SaaS platform branding remains <strong>Drivinity</strong> across global headers and footers).</em>
                      </p>
                    </div>

                    {settingsSuccess && (
                      <div className="success-alert-box" style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22C55E', borderRadius: '8px', color: '#22C55E', fontWeight: 600 }}>
                        <CheckCircle2 size={18} /> {settingsSuccess}
                      </div>
                    )}

                    {settingsError && (
                      <div className="error-alert-box" style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #EF4444', borderRadius: '8px', color: '#EF4444', fontWeight: 600 }}>
                        <AlertCircle size={18} /> {settingsError}
                      </div>
                    )}

                    <form onSubmit={handleSaveSchoolSettings} className="settings-form">
                      <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', fontWeight: 700 }}>
                          <Building size={16} style={{ color: 'var(--accent-gold)' }} /> Driving School Business Name
                        </label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                          placeholder="e.g. Apex Auto Driving School"
                          required
                          style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}
                        />
                        <span style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.2rem', display: 'block' }}>
                          This name will be displayed as your driving school business name across booking confirmations and customer communications.
                        </span>
                      </div>

                      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                        <div className="form-group">
                          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', fontWeight: 700 }}>
                            <Phone size={16} style={{ color: 'var(--accent-gold)' }} /> Support Phone Number
                          </label>
                          <input 
                            type="text" 
                            className="form-input" 
                            value={schoolPhone}
                            onChange={(e) => setSchoolPhone(e.target.value)}
                            placeholder="e.g. 0412 345 678"
                            required
                            style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', fontWeight: 700 }}>
                            <Mail size={16} style={{ color: 'var(--accent-gold)' }} /> Support Email Address
                          </label>
                          <input 
                            type="email" 
                            className="form-input" 
                            value={schoolEmail}
                            onChange={(e) => setSchoolEmail(e.target.value)}
                            placeholder="e.g. contact@yourdrivingschool.com.au"
                            required
                            style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}
                          />
                        </div>
                      </div>

                      <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', fontWeight: 700 }}>
                          <MapPin size={16} style={{ color: 'var(--accent-gold)' }} /> Business HQ Address & Locations
                        </label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={schoolAddress}
                          onChange={(e) => setSchoolAddress(e.target.value)}
                          placeholder="e.g. Suite 100, Innovation Way, Sydney NSW Australia"
                          required
                          style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}
                        />
                      </div>

                      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                        <div className="form-group">
                          <label className="form-label" style={{ marginBottom: '0.4rem', fontWeight: 700 }}>
                            Operating Hours
                          </label>
                          <input 
                            type="text" 
                            className="form-input" 
                            value={operatingHours}
                            onChange={(e) => setOperatingHours(e.target.value)}
                            placeholder="e.g. Mon – Sun: 7:00 AM – 7:00 PM"
                            style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label" style={{ marginBottom: '0.4rem', fontWeight: 700 }}>
                            Service Area / Suburbs
                          </label>
                          <input 
                            type="text" 
                            className="form-input" 
                            value={serviceArea}
                            onChange={(e) => setServiceArea(e.target.value)}
                            placeholder="e.g. Greater Sydney & Surrounding Suburbs"
                            style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}
                          />
                        </div>
                      </div>

                      <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label" style={{ marginBottom: '0.4rem', fontWeight: 700 }}>
                          School Tagline / Mission
                        </label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={tagline}
                          onChange={(e) => setTagline(e.target.value)}
                          placeholder="e.g. Safe, structured driving instruction for Australian roads."
                          style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        variant="yellow" 
                        size="lg" 
                        disabled={savingSettings || user.role !== 'admin'}
                        style={{ width: '100%' }}
                      >
                        {savingSettings ? 'SAVING BUSINESS PROFILE...' : 'SAVE SCHOOL PROFILE & PUBLISH'}
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Student Progress Evaluation Modal */}
          {selectedStudentProgress && (
            <div className="modal-backdrop" onClick={() => setSelectedStudentProgress(null)}>
              <div className="modal-content aura-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>Competency Matrix: {selectedStudentProgress.student.fullName}</h3>
                  <button className="close-btn" onClick={() => setSelectedStudentProgress(null)}>✕</button>
                </div>
                <div className="modal-body">
                  {selectedStudentProgress.progress.length === 0 ? (
                    <p>No competency evaluations recorded yet.</p>
                  ) : (
                    <div className="progress-matrix-list">
                      {selectedStudentProgress.progress.map((sk: any) => (
                        <div key={sk.skillId} className="matrix-row">
                          <div>
                            <span className="skill-cat">{sk.category}</span>
                            <strong>{sk.skillName}</strong>
                            {sk.instructorNotes && <p className="notes-text">"{sk.instructorNotes}"</p>}
                          </div>
                          <span className={`status-badge ${sk.status}`}>{sk.status.replace('_', ' ').toUpperCase()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Note: Admin password updates must be processed through a real protected backend route endpoint. Client-side credential modification forms have been permanently removed. */}

      <style>{`
        .admin-toolbar {
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .tabs-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.95rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
          background: #FAFAF8;
          border: 1px solid var(--border-light);
          color: #64748B;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .tab-btn.active {
          background: #07131D;
          color: var(--accent-gold);
          border-color: #07131D;
        }

        .toolbar-actions {
          display: flex;
          gap: 0.5rem;
        }

        .stats-cards-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 1100px) {
          .stats-cards-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 700px) {
          .stats-cards-grid { grid-template-columns: 1fr; }
        }

        .stat-card {
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .stat-icon-wrap {
          color: var(--accent-gold);
        }
        .stat-label { display: block; font-size: 0.75rem; color: #64748B; }
        .stat-value { display: block; font-size: 1.6rem; font-family: var(--font-display); font-weight: 900; }

        .status-bars-grid {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .status-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.9rem;
          margin-bottom: 0.35rem;
        }
        .green { color: #16A34A; }
        .gold { color: #D97706; }
        .red { color: #EF4444; }

        .bar-bg { width: 100%; height: 8px; background: #E2DFD6; border-radius: 99px; overflow: hidden; }
        .bar-fill { height: 100%; border-radius: 99px; }
        .bar-fill.green { background: #16A34A; }
        .bar-fill.gold { background: var(--accent-gold); }
        .bar-fill.red { background: #EF4444; }

        .filter-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .search-wrap { flex: 1; min-width: 260px; position: relative; }
        .search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94A3B8; }
        .search-input { padding-left: 2.5rem !important; }

        .admin-table-container { overflow-x: auto; padding: 0.5rem; }
        .admin-table { width: 100%; border-collapse: collapse; text-align: left; }
        .admin-table th { padding: 1rem; font-size: 0.775rem; color: #64748B; font-weight: 800; border-bottom: 1px solid var(--border-light); }
        .admin-table td { padding: 1rem; border-bottom: 1px solid var(--border-light); font-size: 0.875rem; vertical-align: middle; }
        .td-sub { display: block; font-size: 0.775rem; color: #64748B; margin-top: 0.15rem; }

        .status-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 900;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
        }
        .status-badge.confirmed { background: rgba(22, 163, 74, 0.15); color: #16A34A; }
        .status-badge.pending { background: rgba(217, 119, 6, 0.15); color: #D97706; }
        .status-badge.cancelled { background: rgba(239, 68, 68, 0.15); color: #EF4444; }

        .tag-pill {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 800;
          background: #FAFAF8;
          border: 1px solid var(--border-light);
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          margin-right: 0.35rem;
        }

        .table-actions { display: flex; gap: 0.35rem; }
        .btn-action {
          padding: 0.3rem 0.65rem;
          font-size: 0.75rem;
          font-weight: 800;
          border-radius: 4px;
          cursor: pointer;
          border: none;
        }
        .btn-action.confirm { background: #16A34A; color: #FFFFFF; }
        .btn-action.cancel { background: #EF4444; color: #FFFFFF; }

        .inquiries-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .inquiry-card { padding: 1.25rem; display: flex; flex-direction: column; gap: 0.65rem; }
        .inq-message { font-size: 0.875rem; color: #475569; font-style: italic; }
        .inq-date { font-size: 0.75rem; color: #94A3B8; margin-top: auto; }

        .modal-backdrop {
          position: fixed; inset: 0; background: rgba(0, 0, 0, 0.65);
          display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem;
        }
        .modal-content {
          background: #FFFFFF; max-width: 600px; width: 100%; max-height: 80vh; overflow-y: auto; padding: 1.75rem;
        }
        .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
        .close-btn { background: none; border: none; font-size: 1.25rem; cursor: pointer; color: #64748B; }
        .progress-matrix-list { display: flex; flex-direction: column; gap: 0.85rem; }
        .matrix-row { display: flex; align-items: flex-start; justify-content: space-between; padding-bottom: 0.65rem; border-bottom: 1px solid var(--border-light); }
        .skill-cat { font-size: 0.7rem; font-weight: 800; color: #94A3B8; text-transform: uppercase; }
        .notes-text { font-size: 0.775rem; color: #64748B; font-style: italic; margin-top: 0.15rem; }
      `}</style>
    </div>
  );
};

export default Admin;
