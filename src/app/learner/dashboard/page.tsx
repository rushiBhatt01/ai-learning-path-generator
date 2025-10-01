'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  User, 
  Trophy, 
  Target, 
  BookOpen, 
  Zap, 
  Star, 
  TrendingUp, 
  Calendar,
  Award,
  Flame,
  Users,
  ChevronRight,
  Settings,
  LogOut,
  BarChart3,
  Map,
  Play,
  CheckCircle,
  Clock,
  ArrowRight,
  Brain,
  Send
} from 'lucide-react';

export default function LearnerDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState({
    name: session?.user?.name || 'Learner',
    xp: 1250,
    level: 5,
    streak: 7,
    badges: ['Skill Explorer', 'Fast Learner', 'Career Climber'],
    avatar: '👨‍💻'
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [showSettings, setShowSettings] = useState(false);
  const [roadmapPrompt, setRoadmapPrompt] = useState('');
  const [roadmapData, setRoadmapData] = useState<any>(null);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  const [courseProgress, setCourseProgress] = useState<Record<string, number>>({
    'JavaScript Fundamentals': 0,
    'React Development': 25,
    'Data Structures & Algorithms': 0
  });
  const [pathwayItems, setPathwayItems] = useState<{
    title: string;
    description: string;
    xp: number;
    difficulty: string;
    duration: string;
    progress: number;
    link?: string;
  }[]>([]);

  // Load saved pathway from localStorage
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('myPathway') : null;
      if (raw) setPathwayItems(JSON.parse(raw));
    } catch (e) {
      console.error('Failed to load pathway:', e);
    }
  }, []);

  // Handlers
  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/auth/signin' });
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleSettings = () => setShowSettings((v) => !v);

  const handleCourseAction = (courseTitle: string, currentProgress: number) => {
    if (currentProgress === 0) {
      setCourseProgress((prev) => ({ ...prev, [courseTitle]: 5 }));
      setUser((prev) => ({ ...prev, xp: prev.xp + 10 }));
      return;
    }
    const newProgress = Math.min(currentProgress + 10, 100);
    setCourseProgress((prev) => ({ ...prev, [courseTitle]: newProgress }));
    setUser((prev) => ({ ...prev, xp: prev.xp + 20 }));
  };

  // Roadmap generation
  const generateRoadmap = async () => {
    if (!roadmapPrompt.trim()) return;
    
    setIsGeneratingRoadmap(true);
    
    // Simulate AI generation with sample data
    setTimeout(() => {
      const sampleRoadmap = {
        title: roadmapPrompt,
        totalDuration: '12 weeks',
        difficulty: 'Intermediate',
        modules: [
          {
            id: 1,
            title: 'Foundation Concepts',
            duration: '2 weeks',
            status: 'completed',
            lessons: [
              { title: 'Introduction to Concepts', duration: '3 hours', status: 'completed' },
              { title: 'Basic Principles', duration: '4 hours', status: 'completed' },
              { title: 'Practice Exercises', duration: '2 hours', status: 'completed' }
            ]
          },
          {
            id: 2,
            title: 'Core Skills Development',
            duration: '4 weeks',
            status: 'in-progress',
            lessons: [
              { title: 'Advanced Techniques', duration: '5 hours', status: 'completed' },
              { title: 'Real-world Applications', duration: '6 hours', status: 'in-progress' },
              { title: 'Project Work', duration: '8 hours', status: 'pending' }
            ]
          },
          {
            id: 3,
            title: 'Advanced Implementation',
            duration: '4 weeks',
            status: 'pending',
            lessons: [
              { title: 'Complex Scenarios', duration: '7 hours', status: 'pending' },
              { title: 'Optimization Strategies', duration: '5 hours', status: 'pending' },
              { title: 'Final Project', duration: '10 hours', status: 'pending' }
            ]
          },
          {
            id: 4,
            title: 'Mastery & Certification',
            duration: '2 weeks',
            status: 'pending',
            lessons: [
              { title: 'Expert Level Concepts', duration: '6 hours', status: 'pending' },
              { title: 'Certification Prep', duration: '4 hours', status: 'pending' },
              { title: 'Portfolio Development', duration: '8 hours', status: 'pending' }
            ]
          }
        ]
      };
      
      setRoadmapData(sampleRoadmap);
      setIsGeneratingRoadmap(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/20';
      case 'in-progress': return 'text-blue-400 bg-blue-400/20';
      case 'pending': return 'text-gray-400 bg-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <Play className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const stats = [
    { label: 'Total XP', value: user.xp, icon: <Zap className="w-5 h-5" />, color: 'text-yellow-400' },
    { label: 'Level', value: user.level, icon: <Star className="w-5 h-5" />, color: 'text-blue-400' },
    { label: 'Streak', value: `${user.streak} days`, icon: <Flame className="w-5 h-5" />, color: 'text-orange-400' },
    { label: 'Badges', value: user.badges.length, icon: <Award className="w-5 h-5" />, color: 'text-purple-400' }
  ];

  const recommendations = [
    {
      title: 'JavaScript Fundamentals',
      description: 'Master the basics of JavaScript programming',
      xp: 150,
      difficulty: 'Beginner',
      duration: '2 weeks',
      progress: courseProgress['JavaScript Fundamentals']
    },
    {
      title: 'React Development',
      description: 'Build modern web applications with React',
      xp: 300,
      difficulty: 'Intermediate',
      duration: '4 weeks',
      progress: courseProgress['React Development']
    },
    {
      title: 'Data Structures & Algorithms',
      description: 'Essential computer science concepts',
      xp: 400,
      difficulty: 'Advanced',
      duration: '6 weeks',
      progress: courseProgress['Data Structures & Algorithms']
    }
  ].concat(pathwayItems.map((p) => ({
    title: p.title,
    description: p.description,
    xp: p.xp,
    difficulty: p.difficulty,
    duration: p.duration,
    progress: typeof courseProgress[p.title as keyof typeof courseProgress] === 'number' ? (courseProgress as any)[p.title] : p.progress,
    link: p.link
  })));

  const recentActivity = [
    { action: 'Completed', item: 'HTML Basics Quiz', xp: 50, time: '2 hours ago' },
    { action: 'Earned Badge', item: 'Skill Explorer', xp: 100, time: '1 day ago' },
    { action: 'Started', item: 'CSS Fundamentals', xp: 0, time: '2 days ago' },
    { action: 'Completed', item: 'Web Design Basics', xp: 75, time: '3 days ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                {user.avatar}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome back, {user.name}!</h1>
                <p className="text-white/70">Ready to continue your learning journey?</p>
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

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 mt-4">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-2 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
              activeTab === 'roadmap'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Map className="w-4 h-4 mr-2" />
            Roadmap
          </button>
          <button
            onClick={() => router.push('/learner/career-guidance')}
            className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 text-white/70 hover:text-white hover:bg-white/10`}
          >
            Career Guidance
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-4 max-w-7xl px-6"
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Settings</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Theme</label>
                <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="galaxy">Galaxy</option>
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Notifications</label>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-white/70">Enable notifications</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setShowSettings(false)} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                Save Settings
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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

        {/* Roadmap Tab Content */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8">
            {/* Roadmap Generator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Brain className="w-6 h-6 text-purple-400" />
                AI-Powered Learning Roadmap
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={roadmapPrompt}
                    onChange={(e) => setRoadmapPrompt(e.target.value)}
                    placeholder="Describe what you want to learn (e.g., 'Become a Full-Stack Developer', 'Learn Data Science')"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={generateRoadmap}
                    disabled={isGeneratingRoadmap || !roadmapPrompt.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGeneratingRoadmap ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Generate Roadmap
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Generated Roadmap */}
            {roadmapData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{roadmapData.title}</h3>
                  <div className="flex items-center gap-4 text-white/70">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {roadmapData.totalDuration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {roadmapData.difficulty}
                    </span>
                  </div>
                </div>

                {/* Roadmap Graph */}
                <div className="space-y-6">
                  {roadmapData.modules.map((module: any, index: number) => (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="relative"
                    >
                      {/* Connection Line */}
                      {index < roadmapData.modules.length - 1 && (
                        <div className="absolute left-6 top-16 w-0.5 h-8 bg-gradient-to-b from-blue-500 to-purple-600"></div>
                      )}
                      
                      <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          {/* Module Icon */}
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            module.status === 'completed' ? 'bg-green-500/20' :
                            module.status === 'in-progress' ? 'bg-blue-500/20' :
                            'bg-gray-500/20'
                          }`}>
                            {getStatusIcon(module.status)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-lg font-semibold text-white">{module.title}</h4>
                              <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(module.status)}`}>
                                  {module.status.replace('-', ' ')}
                                </span>
                                <span className="text-white/60 text-sm">{module.duration}</span>
                              </div>
                            </div>
                            
                            {/* Lessons */}
                            <div className="space-y-2">
                              {module.lessons.map((lesson: any, lessonIndex: number) => (
                                <div key={lessonIndex} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                      lesson.status === 'completed' ? 'bg-green-500/20' :
                                      lesson.status === 'in-progress' ? 'bg-blue-500/20' :
                                      'bg-gray-500/20'
                                    }`}>
                                      {getStatusIcon(lesson.status)}
                                    </div>
                                    <span className="text-white font-medium">{lesson.title}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-white/60 text-sm">{lesson.duration}</span>
                                    <button className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded transition-all duration-200">
                                      <Play className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Progress Visualization Graph */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-400" />
                    Learning Progress Visualization
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Progress Overview */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Overall Progress</h4>
                        <div className="space-y-4">
                          {(() => {
                            const totalLessons = roadmapData.modules.reduce((acc: number, module: any) => acc + module.lessons.length, 0);
                            const completedLessons = roadmapData.modules.reduce((acc: number, module: any) => 
                              acc + module.lessons.filter((lesson: any) => lesson.status === 'completed').length, 0);
                            const inProgressLessons = roadmapData.modules.reduce((acc: number, module: any) => 
                              acc + module.lessons.filter((lesson: any) => lesson.status === 'in-progress').length, 0);
                            const pendingLessons = totalLessons - completedLessons - inProgressLessons;
                            
                            return (
                              <>
                                <div className="flex items-center justify-between">
                                  <span className="text-white/70">Completed</span>
                                  <span className="text-green-400 font-semibold">{completedLessons}/{totalLessons}</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-3">
                                  <div 
                                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000"
                                    style={{ width: `${(completedLessons / totalLessons) * 100}%` }}
                                  ></div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <span className="text-white/70">In Progress</span>
                                  <span className="text-blue-400 font-semibold">{inProgressLessons}</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-3">
                                  <div 
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000"
                                    style={{ width: `${(inProgressLessons / totalLessons) * 100}%` }}
                                  ></div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <span className="text-white/70">Pending</span>
                                  <span className="text-gray-400 font-semibold">{pendingLessons}</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-3">
                                  <div 
                                    className="bg-gradient-to-r from-gray-500 to-gray-600 h-3 rounded-full transition-all duration-1000"
                                    style={{ width: `${(pendingLessons / totalLessons) * 100}%` }}
                                  ></div>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>

                    {/* Module Progress Chart */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Module Completion</h4>
                      <div className="space-y-4">
                        {roadmapData.modules.map((module: any, index: number) => {
                          const completedInModule = module.lessons.filter((lesson: any) => lesson.status === 'completed').length;
                          const totalInModule = module.lessons.length;
                          const percentage = (completedInModule / totalInModule) * 100;
                          
                          return (
                            <div key={module.id} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-white/70 text-sm">{module.title}</span>
                                <span className="text-white font-semibold">{Math.round(percentage)}%</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-1000"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <div className="flex items-center justify-between text-xs text-white/60">
                                <span>{completedInModule}/{totalInModule} lessons</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  module.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                  module.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                                  'bg-gray-500/20 text-gray-400'
                                }`}>
                                  {module.status.replace('-', ' ')}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Achievement Badges */}
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-white mb-4">Achievement Badges</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {(() => {
                        const totalLessons = roadmapData.modules.reduce((acc: number, module: any) => acc + module.lessons.length, 0);
                        const completedLessons = roadmapData.modules.reduce((acc: number, module: any) => 
                          acc + module.lessons.filter((lesson: any) => lesson.status === 'completed').length, 0);
                        const percentage = (completedLessons / totalLessons) * 100;
                        
                        const badges = [
                          { name: 'First Steps', icon: '🚀', condition: completedLessons >= 1, color: 'from-blue-500 to-cyan-500' },
                          { name: 'Getting Started', icon: '⭐', condition: percentage >= 25, color: 'from-green-500 to-emerald-500' },
                          { name: 'Halfway There', icon: '🔥', condition: percentage >= 50, color: 'from-orange-500 to-red-500' },
                          { name: 'Almost Master', icon: '💎', condition: percentage >= 75, color: 'from-purple-500 to-pink-500' },
                          { name: 'Complete Master', icon: '👑', condition: percentage >= 100, color: 'from-yellow-500 to-orange-500' },
                          { name: 'Consistent Learner', icon: '📚', condition: completedLessons >= 5, color: 'from-indigo-500 to-purple-500' }
                        ];
                        
                        return badges.map((badge, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                              badge.condition 
                                ? `bg-gradient-to-r ${badge.color} border-transparent text-white` 
                                : 'bg-white/5 border-white/10 text-white/50'
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-2xl mb-2">{badge.icon}</div>
                              <div className="text-sm font-medium">{badge.name}</div>
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        )}

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
            {/* Journey Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-400" />
                Your Learning Journey
              </h2>
              <div className="space-y-4">
                {recommendations.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-white/70 text-sm mb-3">{item.description}</p>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <Zap className="w-4 h-4" />
                            {item.xp} XP
                          </span>
                          <span>{item.difficulty}</span>
                          <span>{item.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-400">{item.progress}%</div>
                        <div className="text-white/60 text-sm">Complete</div>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noreferrer" className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2">
                        Go to Course
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <button onClick={() => handleCourseAction(item.title, item.progress)} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2">
                        {item.progress > 0 ? 'Continue' : 'Start'} Learning
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-green-400" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{activity.action}: {activity.item}</div>
                        <div className="text-white/60 text-sm">{activity.time}</div>
                      </div>
                    </div>
                    {activity.xp > 0 && (
                      <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                        <Zap className="w-4 h-4" />
                        +{activity.xp}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Your Badges
              </h3>
              <div className="space-y-3">
                {user.badges.map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-medium">{badge}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-green-400" />
                Leaderboard
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Alex Chen', xp: 2500, rank: 1 },
                  { name: 'Sarah Johnson', xp: 2200, rank: 2 },
                  { name: user.name, xp: user.xp, rank: 3 },
                  { name: 'Mike Wilson', xp: 1800, rank: 4 },
                  { name: 'Emma Davis', xp: 1600, rank: 5 }
                ].map((player, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      player.name === user.name 
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30' 
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        player.rank === 1 ? 'bg-yellow-400 text-black' :
                        player.rank === 2 ? 'bg-gray-300 text-black' :
                        player.rank === 3 ? 'bg-orange-400 text-white' :
                        'bg-white/20 text-white'
                      }`}>
                        {player.rank}
                      </div>
                      <span className="text-white font-medium">{player.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                      <Zap className="w-4 h-4" />
                      {player.xp}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
