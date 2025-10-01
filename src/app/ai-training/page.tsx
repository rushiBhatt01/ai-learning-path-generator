'use client';

import { motion } from 'framer-motion';
import { 
  Brain, 
  Database, 
  Cpu, 
  BarChart3, 
  Zap, 
  Lock, 
  ArrowRight,
  Play,
  Pause,
  Settings,
  TrendingUp,
  Target,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

export default function AITrainingModule() {
  const pipelineSteps = [
    {
      id: 1,
      title: 'Data Ingestion',
      description: 'Collect and preprocess learner data, NSQF datasets, and market trends',
      status: 'ready',
      icon: <Database className="w-6 h-6" />,
      progress: 0
    },
    {
      id: 2,
      title: 'Feature Engineering',
      description: 'Extract meaningful features from learner behavior and skill patterns',
      status: 'locked',
      icon: <Settings className="w-6 h-6" />,
      progress: 0
    },
    {
      id: 3,
      title: 'Model Training',
      description: 'Train lightweight recommendation and profiling models',
      status: 'locked',
      icon: <Cpu className="w-6 h-6" />,
      progress: 0
    },
    {
      id: 4,
      title: 'Model Validation',
      description: 'Validate model performance and accuracy metrics',
      status: 'locked',
      icon: <CheckCircle className="w-6 h-6" />,
      progress: 0
    },
    {
      id: 5,
      title: 'Deployment',
      description: 'Deploy models to production environment',
      status: 'locked',
      icon: <Zap className="w-6 h-6" />,
      progress: 0
    }
  ];

  const upcomingFeatures = [
    {
      title: 'Custom Recommendation Engine',
      description: 'Train personalized models based on learner preferences and career goals',
      icon: <Target className="w-5 h-5" />,
      eta: 'Q2 2024'
    },
    {
      title: 'Skill Gap Prediction',
      description: 'Predict future skill demands using advanced ML algorithms',
      icon: <TrendingUp className="w-5 h-5" />,
      eta: 'Q3 2024'
    },
    {
      title: 'Real-time Profiling',
      description: 'Dynamic learner profiling with continuous model updates',
      icon: <Brain className="w-5 h-5" />,
      eta: 'Q4 2024'
    },
    {
      title: 'NSQF Integration',
      description: 'Seamless integration with National Skills Qualification Framework',
      icon: <BarChart3 className="w-5 h-5" />,
      eta: 'Q1 2025'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-green-400 bg-green-400/20';
      case 'locked': return 'text-gray-400 bg-gray-400/20';
      case 'in-progress': return 'text-blue-400 bg-blue-400/20';
      case 'completed': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return <Play className="w-4 h-4" />;
      case 'locked': return <Lock className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Lock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              AI Model Training Pipeline
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Future-ready machine learning infrastructure for personalized learning recommendations and skill profiling
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-orange-500/20 border border-orange-500/50 rounded-full text-orange-300">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Coming Soon - Q2 2024</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Training Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Model Training Pipeline
          </h2>
          <div className="space-y-6">
            {pipelineSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="relative"
              >
                <div className="flex items-center gap-6">
                  {/* Step Number */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                    step.status === 'ready' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                    step.status === 'locked' ? 'bg-gradient-to-r from-gray-500 to-gray-600' :
                    'bg-gradient-to-r from-blue-500 to-blue-600'
                  }`}>
                    {step.id}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`${step.status === 'locked' ? 'text-gray-400' : 'text-white'}`}>
                          {step.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(step.status)}`}>
                        {getStatusIcon(step.status)}
                        {step.status === 'locked' ? 'Locked' : 'Ready'}
                      </div>
                    </div>
                    <p className="text-white/70 mb-4">{step.description}</p>
                    
                    {step.status === 'locked' && (
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Lock className="w-4 h-4" />
                        <span>Requires previous steps completion</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Connector Line */}
                {index < pipelineSteps.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-6 bg-gradient-to-b from-white/20 to-white/10"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Upcoming Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <div className="text-blue-400 text-sm font-medium">{feature.eta}</div>
                  </div>
                </div>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Technology Stack
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">PyTorch</h3>
              <p className="text-white/70">Deep learning framework for model training and inference</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">TensorFlow</h3>
              <p className="text-white/70">Alternative ML framework for production deployment</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">MLflow</h3>
              <p className="text-white/70">Model lifecycle management and experiment tracking</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-lg border border-white/20 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Stay Updated on AI Training Progress
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Be the first to know when our AI model training pipeline goes live and experience the future of personalized learning.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 mx-auto shadow-2xl"
            >
              <Zap className="w-5 h-5" />
              Get Notified
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
