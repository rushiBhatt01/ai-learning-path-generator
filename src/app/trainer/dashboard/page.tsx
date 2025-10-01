'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  Award, 
  MessageSquare, 
  BookOpen, 
  Target,
  Calendar,
  BarChart3,
  Star,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  LogOut
} from 'lucide-react';

export default function TrainerDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [showSettings, setShowSettings] = useState(false);

  const batchStats = {
    totalLearners: 45,
    activeLearners: 38,
    completedCourses: 12,
    averageProgress: 68
  };

  const learners = [
    { 
      id: 1, 
      name: 'Alex Chen', 
      progress: 85, 
      xp: 2500, 
      streak: 12, 
      lastActive: '2 hours ago',
      status: 'active',
      courses: ['JavaScript Fundamentals', 'React Development'],
      badges: ['Fast Learner', 'Skill Explorer']
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      progress: 72, 
      xp: 2200, 
      streak: 8, 
      lastActive: '1 day ago',
      status: 'active',
      courses: ['Python Basics', 'Data Analysis'],
      badges: ['Career Climber']
    },
    { 
      id: 3, 
      name: 'Mike Wilson', 
      progress: 45, 
      xp: 1800, 
      streak: 3, 
      lastActive: '3 days ago',
      status: 'needs-attention',
      courses: ['Web Design'],
      badges: []
    },
    { 
      id: 4, 
      name: 'Emma Davis', 
      progress: 95, 
      xp: 3200, 
      streak: 15, 
      lastActive: '30 minutes ago',
      status: 'excellent',
      courses: ['Full Stack Development', 'DevOps'],
      badges: ['Fast Learner', 'Skill Explorer', 'Career Climber']
    }
  ];

  const courses = [
    { title: 'JavaScript Fundamentals', enrolled: 25, completion: 80, rating: 4.8 },
    { title: 'React Development', enrolled: 18, completion: 65, rating: 4.6 },
    { title: 'Python Basics', enrolled: 22, completion: 70, rating: 4.7 },
    { title: 'Data Analysis', enrolled: 15, completion: 55, rating: 4.5 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400 bg-green-400/20';
      case 'active': return 'text-blue-400 bg-blue-400/20';
      case 'needs-attention': return 'text-orange-400 bg-orange-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-4 h-4" />;
      case 'active': return <Clock className="w-4 h-4" />;
      case 'needs-attention': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Trainer Dashboard</h1>
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
                <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={activeTab} onChange={(e) => setActiveTab(e.target.value)}>
                  <option value="overview">Overview</option>
                  <option value="learners">Learners</option>
                  <option value="courses">Courses</option>
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Notifications</label>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-white/70">Enable batch alerts</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setShowSettings(false)} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">Save Settings</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Learners', value: batchStats.totalLearners, icon: <Users className="w-5 h-5" />, color: 'text-blue-400' },
            { label: 'Active Learners', value: batchStats.activeLearners, icon: <TrendingUp className="w-5 h-5" />, color: 'text-green-400' },
            { label: 'Completed Courses', value: batchStats.completedCourses, icon: <BookOpen className="w-5 h-5" />, color: 'text-purple-400' },
            { label: 'Avg Progress', value: `${batchStats.averageProgress}%`, icon: <BarChart3 className="w-5 h-5" />, color: 'text-orange-400' }
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learner Progress Heatmap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-400" />
                Learner Progress Overview
              </h2>
              <div className="space-y-4">
                {learners.map((learner, index) => (
                  <motion.div
                    key={learner.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {learner.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{learner.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <span className="flex items-center gap-1">
                              <Zap className="w-4 h-4" />
                              {learner.xp} XP
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              {learner.streak} day streak
                            </span>
                            <span>{learner.lastActive}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(learner.status)}`}>
                        {getStatusIcon(learner.status)}
                        {learner.status.replace('-', ' ')}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/70 text-sm">Overall Progress</span>
                        <span className="text-white font-semibold">{learner.progress}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${learner.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        {learner.courses.map((course, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                            {course}
                          </span>
                        ))}
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 text-sm flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Provide Feedback
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Course Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-green-400" />
                Course Performance
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {courses.map((course, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">{course.title}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70 text-sm">Enrolled</span>
                        <span className="text-white font-semibold">{course.enrolled}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70 text-sm">Completion Rate</span>
                        <span className="text-white font-semibold">{course.completion}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70 text-sm">Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-semibold">{course.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${course.completion}%` }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Top Performers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Top Performers
              </h3>
              <div className="space-y-3">
                {learners
                  .sort((a, b) => b.xp - a.xp)
                  .slice(0, 5)
                  .map((learner, index) => (
                    <motion.div
                      key={learner.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-yellow-400 text-black' :
                          index === 1 ? 'bg-gray-300 text-black' :
                          index === 2 ? 'bg-orange-400 text-white' :
                          'bg-white/20 text-white'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="text-white font-medium">{learner.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                        <Zap className="w-4 h-4" />
                        {learner.xp}
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Create New Course
                </button>
                <button className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Send Batch Message
                </button>
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Generate Report
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
