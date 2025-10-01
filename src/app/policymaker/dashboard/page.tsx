'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target,
  Brain,
  Map,
  PieChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  LogOut,
  Download,
  Filter
} from 'lucide-react';

export default function PolicymakerDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedTimeframe, setSelectedTimeframe] = useState('6 months');
  const [showSettings, setShowSettings] = useState(false);

  const overviewStats = {
    totalLearners: 12500,
    activePrograms: 45,
    completionRate: 78,
    skillGapReduction: 23
  };

  const skillDemandData = [
    { skill: 'JavaScript', demand: 95, supply: 72, gap: 23 },
    { skill: 'Python', demand: 88, supply: 65, gap: 23 },
    { skill: 'React', demand: 82, supply: 58, gap: 24 },
    { skill: 'Data Science', demand: 76, supply: 45, gap: 31 },
    { skill: 'Cloud Computing', demand: 71, supply: 38, gap: 33 },
    { skill: 'AI/ML', demand: 68, supply: 28, gap: 40 }
  ];

  const regionalData = [
    { region: 'North', learners: 3200, completion: 82, demand: 'High' },
    { region: 'South', learners: 2800, completion: 75, demand: 'Medium' },
    { region: 'East', learners: 3500, completion: 80, demand: 'High' },
    { region: 'West', learners: 3000, completion: 78, demand: 'Medium' }
  ];

  const insights = [
    {
      title: 'Critical Skill Gap Alert',
      description: 'AI/ML skills show a 40% gap between demand and supply. Immediate intervention needed.',
      type: 'alert',
      impact: 'High',
      recommendation: 'Launch specialized AI/ML training programs'
    },
    {
      title: 'Regional Success Story',
      description: 'North region shows 82% completion rate. Best practices should be replicated.',
      type: 'success',
      impact: 'Medium',
      recommendation: 'Document and share North region strategies'
    },
    {
      title: 'Emerging Skill Trend',
      description: 'Cloud Computing demand increased by 15% this quarter.',
      type: 'trend',
      impact: 'Medium',
      recommendation: 'Expand cloud computing curriculum'
    }
  ];

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'text-red-400 bg-red-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Low': return 'text-green-400 bg-green-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'trend': return <TrendingUp className="w-5 h-5 text-blue-400" />;
      default: return <Activity className="w-5 h-5 text-gray-400" />;
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
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Policy Dashboard</h1>
                <p className="text-white/70">Welcome back, {session?.user?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-white/70" />
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 text-sm"
                >
                  <option value="All">All Regions</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                </select>
              </div>
              <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                <Download className="w-5 h-5" />
              </button>
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
                <label className="block text-white/80 text-sm font-medium mb-2">Default Region</label>
                <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="All">All</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Timeframe</label>
                <select value={selectedTimeframe} onChange={(e) => setSelectedTimeframe(e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="12 months">12 months</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setShowSettings(false)} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">Save Settings</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Learners', value: overviewStats.totalLearners.toLocaleString(), icon: <Users className="w-5 h-5" />, color: 'text-blue-400' },
            { label: 'Active Programs', value: overviewStats.activePrograms, icon: <Target className="w-5 h-5" />, color: 'text-green-400' },
            { label: 'Completion Rate', value: `${overviewStats.completionRate}%`, icon: <CheckCircle className="w-5 h-5" />, color: 'text-purple-400' },
            { label: 'Skill Gap Reduction', value: `${overviewStats.skillGapReduction}%`, icon: <TrendingUp className="w-5 h-5" />, color: 'text-orange-400' }
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
            {/* Skill Demand Heatmap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Map className="w-6 h-6 text-blue-400" />
                Skill Demand vs Supply Analysis
              </h2>
              <div className="space-y-4">
                {skillDemandData.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-white">{skill.skill}</h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        skill.gap > 30 ? 'text-red-400 bg-red-400/20' :
                        skill.gap > 20 ? 'text-orange-400 bg-orange-400/20' :
                        'text-green-400 bg-green-400/20'
                      }`}>
                        {skill.gap}% Gap
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{skill.demand}%</div>
                        <div className="text-white/70 text-sm">Demand</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{skill.supply}%</div>
                        <div className="text-white/70 text-sm">Supply</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-400">{skill.gap}%</div>
                        <div className="text-white/70 text-sm">Gap</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70 text-sm">Demand</span>
                        <span className="text-white text-sm">{skill.demand}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${skill.demand}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70 text-sm">Supply</span>
                        <span className="text-white text-sm">{skill.supply}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${skill.supply}%` }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Regional Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <PieChart className="w-6 h-6 text-green-400" />
                Regional Performance Analysis
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {regionalData.map((region, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-white">{region.region} Region</h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDemandColor(region.demand)}`}>
                        {region.demand} Demand
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70 text-sm">Total Learners</span>
                        <span className="text-white font-semibold">{region.learners.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70 text-sm">Completion Rate</span>
                        <span className="text-white font-semibold">{region.completion}%</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${region.completion}%` }}
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
            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                AI-Generated Insights
              </h3>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-sm mb-1">{insight.title}</h4>
                        <p className="text-white/70 text-xs mb-2">{insight.description}</p>
                        <div className="text-xs text-blue-400 font-medium">{insight.recommendation}</div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
                      insight.impact === 'High' ? 'text-red-400 bg-red-400/20' :
                      insight.impact === 'Medium' ? 'text-yellow-400 bg-yellow-400/20' :
                      'text-green-400 bg-green-400/20'
                    }`}>
                      {insight.impact} Impact
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
                Policy Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Generate Policy Report
                </button>
                <button className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Analyze Trends
                </button>
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 flex items-center gap-2">
                  <Map className="w-4 h-4" />
                  Regional Analysis
                </button>
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Alert Management
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
