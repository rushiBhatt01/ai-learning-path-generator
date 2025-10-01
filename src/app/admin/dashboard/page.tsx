'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Settings, 
  BarChart3, 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Download,
  Upload,
  Eye,
  MoreVertical,
  LogOut,
  UserPlus,
  FileText,
  Database,
  Activity
} from 'lucide-react';

export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showUserActions, setShowUserActions] = useState<number | null>(null);
  const [showCourseActions, setShowCourseActions] = useState<number | null>(null);
  const [showSkillActions, setShowSkillActions] = useState<number | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'learner',
    password: ''
  });

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(user => user.lastLoginDate && new Date(user.lastLoginDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
    totalCourses: 245,
    totalSkills: 180
  };

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const courses = [
    { id: 1, title: 'JavaScript Fundamentals', instructor: 'Sarah Johnson', students: 1250, status: 'active', createdDate: '2024-01-01' },
    { id: 2, title: 'React Development', instructor: 'Alex Chen', students: 890, status: 'active', createdDate: '2024-01-05' },
    { id: 3, title: 'Python Basics', instructor: 'Mike Wilson', students: 2100, status: 'active', createdDate: '2024-01-10' },
    { id: 4, title: 'Data Science', instructor: 'Emma Davis', students: 750, status: 'draft', createdDate: '2024-01-15' }
  ];

  const skills = [
    { id: 1, name: 'JavaScript', category: 'Programming', difficulty: 'Beginner', marketDemand: 95, courses: 12 },
    { id: 2, name: 'React', category: 'Frontend', difficulty: 'Intermediate', marketDemand: 88, courses: 8 },
    { id: 3, name: 'Python', category: 'Programming', difficulty: 'Beginner', marketDemand: 92, courses: 15 },
    { id: 4, name: 'Machine Learning', category: 'AI/ML', difficulty: 'Advanced', marketDemand: 78, courses: 6 }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'learner': return 'text-blue-400 bg-blue-400/20';
      case 'trainer': return 'text-green-400 bg-green-400/20';
      case 'policymaker': return 'text-purple-400 bg-purple-400/20';
      case 'admin': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'inactive': return 'text-gray-400 bg-gray-400/20';
      case 'draft': return 'text-orange-400 bg-orange-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/20';
      case 'Advanced': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/auth/signin' });
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const handleSettings = () => setShowSettings((v) => !v);

  // Filter data based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSkills = skills.filter(skill => 
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.difficulty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Action handlers
  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleCreateUser = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        alert('User created successfully!');
        setShowAddUserModal(false);
        setNewUser({ name: '', email: '', role: 'learner', password: '' });
        fetchUsers(); // Refresh the user list
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user');
    }
  };

  const handleViewUser = (userId: string) => {
    const user = users.find(u => u._id === userId);
    alert(`Viewing user: ${user?.name} (${user?.email})`);
  };

  const handleEditUser = (userId: string) => {
    const user = users.find(u => u._id === userId);
    alert(`Editing user: ${user?.name}`);
  };

  const handleDeleteUser = async (userId: string) => {
    const user = users.find(u => u._id === userId);
    if (confirm(`Are you sure you want to delete user: ${user?.name}?`)) {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert(`User ${user?.name} deleted successfully!`);
          fetchUsers(); // Refresh the user list
        } else {
          const error = await response.json();
          alert(`Error: ${error.error}`);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  const handleViewCourse = (courseId: number) => {
    const course = courses.find(c => c.id === courseId);
    alert(`Viewing course: ${course?.title}`);
  };

  const handleEditCourse = (courseId: number) => {
    const course = courses.find(c => c.id === courseId);
    alert(`Editing course: ${course?.title}`);
  };

  const handleDeleteCourse = (courseId: number) => {
    const course = courses.find(c => c.id === courseId);
    if (confirm(`Are you sure you want to delete course: ${course?.title}?`)) {
      alert(`Course ${course?.title} deleted successfully!`);
    }
  };

  const handleViewSkill = (skillId: number) => {
    const skill = skills.find(s => s.id === skillId);
    alert(`Viewing skill: ${skill?.name}`);
  };

  const handleEditSkill = (skillId: number) => {
    const skill = skills.find(s => s.id === skillId);
    alert(`Editing skill: ${skill?.name}`);
  };

  const handleDeleteSkill = (skillId: number) => {
    const skill = skills.find(s => s.id === skillId);
    if (confirm(`Are you sure you want to delete skill: ${skill?.name}?`)) {
      alert(`Skill ${skill?.name} deleted successfully!`);
    }
  };

  const handleExportData = () => {
    alert('Exporting data to CSV...');
  };

  const handleImportData = () => {
    alert('Import data from CSV...');
  };

  const handleGenerateReport = () => {
    alert('Generating comprehensive report...');
  };

  const renderUsersTable = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span className="ml-3 text-white/70">Loading users...</span>
        </div>
      );
    }

    if (filteredUsers.length === 0) {
      return (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-white/30 mx-auto mb-4" />
          <p className="text-white/70">No users found</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                  <p className="text-white/70 text-sm">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor('active')}`}>
                      active
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-white font-semibold">{user.xp || 0} XP</div>
                  <div className="text-white/60 text-sm">Joined {new Date(user.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleViewUser(user._id)} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200" title="View User">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleEditUser(user._id)} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200" title="Edit User">
                    <Edit className="w-4 h-4" />
                  </button>
                  <div className="relative">
                    <button onClick={() => setShowUserActions(showUserActions === user._id ? null : user._id)} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200" title="More Actions">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {showUserActions === user._id && (
                      <div className="absolute right-0 top-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-2 space-y-1 z-10">
                        <button onClick={() => handleDeleteUser(user._id)} className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-400/20 rounded-lg text-sm flex items-center gap-2">
                          <Trash2 className="w-3 h-3" />
                          Delete User
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderCoursesTable = () => (
    <div className="space-y-4">
      {filteredCourses.map((course) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                <p className="text-white/70 text-sm">by {course.instructor}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-white/60 text-sm">{course.students} students</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-white font-semibold">{course.students}</div>
                <div className="text-white/60 text-sm">Created {course.createdDate}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleViewCourse(course.id)} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200" title="View Course">
                  <Eye className="w-4 h-4" />
                </button>
                <button onClick={() => handleEditCourse(course.id)} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200" title="Edit Course">
                  <Edit className="w-4 h-4" />
                </button>
                <div className="relative">
                  <button onClick={() => setShowCourseActions(showCourseActions === course.id ? null : course.id)} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200" title="More Actions">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {showCourseActions === course.id && (
                    <div className="absolute right-0 top-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-2 space-y-1 z-10">
                      <button onClick={() => handleDeleteCourse(course.id)} className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-400/20 rounded-lg text-sm flex items-center gap-2">
                        <Trash2 className="w-3 h-3" />
                        Delete Course
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderSkillsTable = () => (
    <div className="space-y-4">
      {filteredSkills.map((skill) => (
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                <p className="text-white/70 text-sm">{skill.category}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(skill.difficulty)}`}>
                    {skill.difficulty}
                  </span>
                  <span className="text-white/60 text-sm">{skill.courses} courses</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-white font-semibold">{skill.marketDemand}%</div>
                <div className="text-white/60 text-sm">Market Demand</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleViewSkill(skill.id)} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200" title="View Skill">
                  <Eye className="w-4 h-4" />
                </button>
                <button onClick={() => handleEditSkill(skill.id)} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200" title="Edit Skill">
                  <Edit className="w-4 h-4" />
                </button>
                <div className="relative">
                  <button onClick={() => setShowSkillActions(showSkillActions === skill.id ? null : skill.id)} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200" title="More Actions">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {showSkillActions === skill.id && (
                    <div className="absolute right-0 top-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-2 space-y-1 z-10">
                      <button onClick={() => handleDeleteSkill(skill.id)} className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-400/20 rounded-lg text-sm flex items-center gap-2">
                        <Trash2 className="w-3 h-3" />
                        Delete Skill
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-orange-500 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-white/70">Welcome back, {session?.user?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={handleSettings} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                <Settings className="w-5 h-5" />
              </button>
              <button onClick={handleLogout} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="max-w-7xl mx-auto px-6 mt-4">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Settings</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Default Tab</label>
                <select value={activeTab} onChange={(e) => setActiveTab(e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="users">Users</option>
                  <option value="courses">Courses</option>
                  <option value="skills">Skills</option>
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Exports</label>
                <button onClick={handleExportData} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">Export CSV</button>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setShowSettings(false)} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">Save Settings</button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-white mb-6">Add New User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter name" 
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter email" 
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Role</label>
                <select 
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="learner">Learner</option>
                  <option value="trainer">Trainer</option>
                  <option value="policymaker">Policymaker</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Password (Optional)</label>
                <input 
                  type="password" 
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter password (optional)" 
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddUserModal(false)} className="px-4 py-2 text-white/70 hover:text-white transition-all duration-200">Cancel</button>
              <button onClick={handleCreateUser} className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200">Add User</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: <Users className="w-5 h-5" />, color: 'text-blue-400' },
            { label: 'Active Users', value: stats.activeUsers.toLocaleString(), icon: <Activity className="w-5 h-5" />, color: 'text-green-400' },
            { label: 'Total Courses', value: stats.totalCourses, icon: <BookOpen className="w-5 h-5" />, color: 'text-purple-400' },
            { label: 'Total Skills', value: stats.totalSkills, icon: <Database className="w-5 h-5" />, color: 'text-orange-400' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color}`}>{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
              {[
                { id: 'users', label: 'Users', icon: <Users className="w-4 h-4" /> },
                { id: 'courses', label: 'Courses', icon: <BookOpen className="w-4 h-4" /> },
                { id: 'skills', label: 'Skills', icon: <Database className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleAddUser} className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Add User
                </button>
                <button onClick={handleExportData} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button onClick={handleImportData} className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Import
                </button>
                <button onClick={handleGenerateReport} className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Report
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="min-h-[400px]">
            {activeTab === 'users' && renderUsersTable()}
            {activeTab === 'courses' && renderCoursesTable()}
            {activeTab === 'skills' && renderSkillsTable()}
          </div>
        </div>
      </div>
    </div>
  );
}