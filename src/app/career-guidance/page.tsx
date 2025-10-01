'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Zap,
  Brain,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Star,
  ArrowRight
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'recommendation' | 'skill-gap';
}

export default function CareerGuidance() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI Career Guide. I can help you discover personalized learning paths, analyze skill gaps, and recommend courses based on your career goals. What would you like to explore today?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        type: botResponse.type
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (input: string): { text: string; type: 'text' | 'recommendation' | 'skill-gap' } => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('skill') || lowerInput.includes('gap') || lowerInput.includes('analysis')) {
      return {
        text: 'Let me analyze your skill profile and show you the current market demands.',
        type: 'skill-gap'
      };
    }

    if (lowerInput.includes('recommend') || lowerInput.includes('course') || lowerInput.includes('learn')) {
      return {
        text: 'Based on your interests, here are some personalized course recommendations for you.',
        type: 'recommendation'
      };
    }

    if (lowerInput.includes('career') || lowerInput.includes('job') || lowerInput.includes('path')) {
      return {
        text: 'I can help you explore different career paths! What field interests you most? Technology, Business, Design, or something else?',
        type: 'text'
      };
    }

    return {
      text: 'That\'s interesting! I can help you with career guidance, skill analysis, or course recommendations. What specific area would you like to explore?',
      type: 'text'
    };
  };

  const skillGapData = [
    { skill: 'JavaScript', current: 60, required: 85, gap: 25 },
    { skill: 'React', current: 45, required: 80, gap: 35 },
    { skill: 'Node.js', current: 30, required: 70, gap: 40 },
    { skill: 'Python', current: 70, required: 75, gap: 5 },
    { skill: 'SQL', current: 55, required: 80, gap: 25 }
  ];

  const recommendations = [
    {
      title: 'Advanced JavaScript Mastery',
      description: 'Deep dive into ES6+, async programming, and modern frameworks',
      duration: '6 weeks',
      difficulty: 'Intermediate',
      xp: 300,
      match: 95
    },
    {
      title: 'React Development Bootcamp',
      description: 'Complete React ecosystem including hooks, context, and testing',
      duration: '8 weeks',
      difficulty: 'Intermediate',
      xp: 400,
      match: 90
    },
    {
      title: 'Full-Stack Development',
      description: 'End-to-end development with Node.js, Express, and MongoDB',
      duration: '12 weeks',
      difficulty: 'Advanced',
      xp: 600,
      match: 85
    }
  ];

  const quickActions = [
    { label: 'Analyze Skills', icon: <BarChart3 className="w-4 h-4" />, action: 'skill-analysis' },
    { label: 'Get Recommendations', icon: <Target className="w-4 h-4" />, action: 'recommendations' },
    { label: 'Career Paths', icon: <TrendingUp className="w-4 h-4" />, action: 'career-paths' },
    { label: 'Market Trends', icon: <Brain className="w-4 h-4" />, action: 'market-trends' }
  ];

  const handleQuickAction = (action: string) => {
    let message = '';
    switch (action) {
      case 'skill-analysis':
        message = 'Please analyze my current skills and show me the gaps';
        break;
      case 'recommendations':
        message = 'I need course recommendations based on my goals';
        break;
      case 'career-paths':
        message = 'What career paths are available in technology?';
        break;
      case 'market-trends':
        message = 'Show me the latest market trends and skill demands';
        break;
    }
    setInputText(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Career Guide</h1>
                <p className="text-white/70">Your personalized learning companion</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl h-[600px] flex flex-col"
            >
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-3 max-w-[80%] ${
                        message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                            : 'bg-gradient-to-r from-green-500 to-blue-600'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className={`rounded-2xl p-4 ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : 'bg-white/10 text-white border border-white/20'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          <div className="text-xs opacity-70 mt-2">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-6 border-t border-white/20">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me about career guidance, skills, or courses..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Quick Actions */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickAction(action.action)}
                      className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 text-sm"
                    >
                      {action.icon}
                      {action.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skill Gap Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Skill Gap Analysis
              </h3>
              <div className="space-y-4">
                {skillGapData.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium text-sm">{skill.skill}</span>
                      <span className="text-orange-400 text-sm font-semibold">{skill.gap}% gap</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-white/60">
                        <span>Current: {skill.current}%</span>
                        <span>Required: {skill.required}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${skill.current}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Course Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" />
                Recommended Courses
              </h3>
              <div className="space-y-4">
                {recommendations.map((course, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-semibold text-sm">{course.title}</h4>
                      <div className="flex items-center gap-1 text-yellow-400 text-xs">
                        <Star className="w-3 h-3" />
                        {course.match}%
                      </div>
                    </div>
                    <p className="text-white/70 text-xs mb-3">{course.description}</p>
                    <div className="flex justify-between items-center text-xs text-white/60">
                      <span>{course.duration}</span>
                      <span>{course.difficulty}</span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {course.xp} XP
                      </span>
                    </div>
                    <button className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-xs flex items-center justify-center gap-1">
                      Start Learning
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
