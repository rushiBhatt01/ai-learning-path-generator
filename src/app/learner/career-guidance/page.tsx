'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  User,
  Zap,
  Star,
  Target,
  MessageCircle,
  Send,
  Clock,
  BadgeCheck,
  Sparkles,
  Brain,
  Medal,
  BookmarkPlus,
  ArrowRight
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

type ChatMessage = {
  id: string;
  sender: 'user' | 'npc';
  text: string;
  ts: number;
};

type SkillScore = {
  skill: string;
  current: number; // 0-100
  target: number; // 0-100
};

const NPC = {
  name: 'Nova',
  title: 'Your Career Navigator',
  avatar: '🌌',
  persona: `Encouraging, insightful, and a bit playful. Speaks like an RPG quest guide.`
};

export default function LearnerCareerGuidance() {
  const { data: session } = useSession();

  // Conversation state (simple in-memory memory)
  const [history, setHistory] = useState<ChatMessage[]>([
    {
      id: 'npc-hello',
      sender: 'npc',
      text: `Greetings, explorer! I'm ${NPC.name} — ${NPC.title}. Tell me your target role or ask anything to begin your quest.`,
      ts: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const [geminiQuery, setGeminiQuery] = useState('');
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [geminiCourses, setGeminiCourses] = useState<{ title: string; url: string }[]>([]);

  // Mock learner profile and progress (would come from DB)
  const learnerName = session?.user?.name || 'Learner';
  const [careerTarget, setCareerTarget] = useState<'Data Analyst' | 'Frontend Developer' | 'ML Engineer'>('Data Analyst');

  const skills: SkillScore[] = useMemo(
    () =>
      careerTarget === 'Data Analyst'
        ? [
            { skill: 'Python', current: 62, target: 85 },
            { skill: 'SQL', current: 55, target: 80 },
            { skill: 'Statistics', current: 48, target: 75 },
            { skill: 'Visualization', current: 58, target: 80 },
            { skill: 'Domain', current: 40, target: 70 }
          ]
        : careerTarget === 'Frontend Developer'
        ? [
            { skill: 'JavaScript', current: 70, target: 90 },
            { skill: 'React', current: 60, target: 88 },
            { skill: 'CSS', current: 65, target: 85 },
            { skill: 'Testing', current: 35, target: 70 },
            { skill: 'Accessibility', current: 30, target: 70 }
          ]
        : [
            { skill: 'Python', current: 68, target: 90 },
            { skill: 'ML Theory', current: 45, target: 85 },
            { skill: 'Data Eng', current: 40, target: 75 },
            { skill: 'MLOps', current: 28, target: 70 },
            { skill: 'Deep Learning', current: 35, target: 85 }
          ],
    [careerTarget]
  );

  const readiness = useMemo(() => {
    // Simple readiness: average current/target ratio
    const ratios = skills.map((s) => Math.min(100, Math.round((s.current / s.target) * 100)));
    return Math.max(5, Math.min(100, Math.round(ratios.reduce((a, b) => a + b, 0) / ratios.length)));
  }, [skills]);

  // Recommendations adapt to target and readiness
  const recommendations = useMemo(
    () => {
      const common = (label: string, xp: number, weeks: number, difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => ({
        label,
        xp,
        weeks,
        difficulty,
        badge: xp >= 350 ? 'Career Climber' : 'Fast Learner'
      });

      if (careerTarget === 'Frontend Developer') {
        return [
          common('React Hooks & State Mastery', 320, 3, 'Intermediate'),
          common('TypeScript for React Devs', 260, 2, 'Intermediate'),
          common('Web Accessibility Deep Dive', 180, 2, 'Beginner')
        ];
      }
      if (careerTarget === 'ML Engineer') {
        return [
          common('MLOps Foundations with Docker & CI', 380, 4, 'Advanced'),
          common('Feature Stores & Experiment Tracking', 300, 3, 'Intermediate'),
          common('Deep Learning with PyTorch', 360, 4, 'Advanced')
        ];
      }
      return [
        common('SQL for Analytics (Window Functions)', 280, 2, 'Intermediate'),
        common('Storytelling with Data Viz', 220, 2, 'Beginner'),
        common('Statistics for Decision Making', 300, 3, 'Intermediate')
      ];
    },
    [careerTarget]
  );

  const addToPathway = (rec: { label: string; xp: number; weeks: number; difficulty: 'Beginner' | 'Intermediate' | 'Advanced' }) => {
    try {
      const key = 'myPathway';
      const existing = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
      const list = existing ? JSON.parse(existing) : [];
      const item = {
        title: rec.label,
        description: `${rec.label} • ${rec.weeks} week(s) • ${rec.difficulty}`,
        xp: rec.xp,
        difficulty: rec.difficulty,
        duration: `${rec.weeks} week${rec.weeks > 1 ? 's' : ''}`,
        progress: 0
      };
      const exists = list.some((x: any) => x.title === item.title);
      if (!exists) {
        list.push(item);
        localStorage.setItem(key, JSON.stringify(list));
      }
      // lightweight feedback
      alert('Added to your pathway! You can see it in Your Learning Journey.');
    } catch (e) {
      console.error('Add to pathway error:', e);
    }
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, typing]);

  const pushMessage = (sender: 'user' | 'npc', text: string) =>
    setHistory((h) => [...h, { id: `${sender}-${Date.now()}`, sender, text, ts: Date.now() }]);

  const npcReply = (userText: string) => {
    // Placeholder rule-based reply with context of target and readiness
    const lower = userText.toLowerCase();
    if (lower.includes('career') || lower.includes('role')) {
      return `Based on your progress, you're ${readiness}% ready for ${careerTarget}. Strengthen highlighted skills and you'll unlock your next quest soon!`;
    }
    if (lower.includes('improve') || lower.includes('how') || lower.includes('next')) {
      const weakest = [...skills].sort((a, b) => a.current - b.current)[0];
      return `Focus on ${weakest.skill} next. I recommend the card "${recommendations[0].label}" — it grants +${recommendations[0].xp} XP and boosts readiness.`;
    }
    if (lower.includes('change') || lower.includes('switch')) {
      return `You can switch target role anytime. Try Frontend Developer, Data Analyst, or ML Engineer to see tailored paths.`;
    }
    return `Ask me about roles, how to improve, or type "next" for a recommended quest.`;
  };

  const send = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput('');
    pushMessage('user', text);
    setTyping(true);
    setTimeout(() => {
      pushMessage('npc', npcReply(text));
      setTyping(false);
    }, 900);
  };

  const askGemini = async () => {
    if (!geminiQuery.trim()) return;
    setGeminiLoading(true);
    try {
      const res = await fetch('/api/ai/course-recs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPrompt: geminiQuery,
          defaultPrompt: `You are a career mentor. Suggest exactly three high-quality, free (if possible) course links relevant to the user's goal. Return strict JSON array with items {"title": string, "url": string}. No extra commentary.`
        })
      });
      if (!res.ok) throw new Error('Gemini request failed');
      const data = await res.json();
      setGeminiCourses(data.courses || []);
    } catch (e) {
      console.error('Gemini error', e);
      setGeminiCourses([]);
    } finally {
      setGeminiLoading(false);
    }
  };

  const addGeminiCourseToPathway = (course: { title: string; url: string }) => {
    try {
      const key = 'myPathway';
      const existing = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
      const list = existing ? JSON.parse(existing) : [];
      const item = {
        title: course.title,
        description: `${course.title} • External Course`,
        xp: 150,
        difficulty: 'Beginner',
        duration: 'self-paced',
        progress: 0,
        link: course.url
      };
      const exists = list.some((x: any) => x.title === item.title);
      if (!exists) {
        list.push(item);
        localStorage.setItem(key, JSON.stringify(list));
      }
      alert('Course added to your dashboard pathway.');
    } catch (e) {
      console.error('Add gemini course error:', e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Top bar with back to dashboard */}
      <div className="border-b border-white/20 bg-white/10 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => (window.location.href = '/learner/dashboard')} className="px-3 py-1.5 rounded-lg border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition">
              ← Back to Dashboard
            </button>
          </div>
          <div className="flex items-center gap-3 text-white">
            <Sparkles className="w-5 h-5 text-blue-300" />
            <span className="font-semibold">Career Progress</span>
            <span className="text-white/70">for {careerTarget}</span>
          </div>
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600" style={{ width: `${readiness}%` }} />
          </div>
          <div className="text-white font-bold min-w-[52px] text-right">{readiness}%</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-8">
        {/* NPC Assistant */}
        <div className="lg:col-span-2 space-y-6">
            {/* Gemini Course Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-white">
                  <Target className="w-5 h-5 text-green-300" />
                  <h3 className="text-lg font-semibold">AI Course Finder (Gemini)</h3>
                </div>
              </div>
              <div className="flex gap-3">
                <input
                  value={geminiQuery}
                  onChange={(e) => setGeminiQuery(e.target.value)}
                  placeholder="e.g. Beginner React resources for building dashboards"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  disabled={geminiLoading || !geminiQuery.trim()}
                  onClick={askGemini}
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {geminiLoading ? 'Fetching…' : 'Find Courses'}
                </motion.button>
              </div>

              {geminiCourses.length > 0 && (
                <div className="mt-4 grid md:grid-cols-3 gap-4">
                  {geminiCourses.map((c, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="text-white font-semibold text-sm line-clamp-2 mb-2">{c.title}</div>
                      <a href={c.url} target="_blank" rel="noreferrer" className="text-xs text-blue-300 underline break-all">{c.url}</a>
                      <div className="mt-3 flex items-center gap-2">
                        <button onClick={() => addGeminiCourseToPathway(c)} className="text-xs px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700">Add to Dashboard</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 h-[560px] flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
                {NPC.avatar}
              </div>
              <div>
                <div className="text-white font-semibold">{NPC.name}</div>
                <div className="text-white/60 text-sm">{NPC.title}</div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              <AnimatePresence>
                {history.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-lg ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-white/10 text-white border border-white/20'
                    }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {typing && (
                <div className="flex items-center gap-2 text-white/70">
                  <Bot className="w-4 h-4" />
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder={`Ask ${NPC.name} anything...`}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button whileTap={{ scale: 0.98 }} onClick={send} className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700">
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Adaptive Recommendations */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-white">
                <Target className="w-5 h-5 text-blue-300" />
                <h3 className="text-xl font-bold">Adaptive Recommendations</h3>
              </div>
              <select
                value={careerTarget}
                onChange={(e) => setCareerTarget(e.target.value as any)}
                className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 text-sm"
              >
                <option value="Data Analyst">Data Analyst</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="ML Engineer">ML Engineer</option>
              </select>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {recommendations.map((rec, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  className="rounded-2xl border border-white/20 bg-white/10 p-4 hover:bg-white/15 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold text-sm">{rec.label}</h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/20 text-blue-200 border border-blue-400/30">
                      {rec.difficulty}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs mb-3">
                    Estimated {rec.weeks} weeks • Reward: <span className="text-yellow-300 font-semibold">+{rec.xp} XP</span>
                  </p>
                  <div className="flex items-center justify-between">
                    <button onClick={() => addToPathway(rec)} className="text-xs px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 flex items-center gap-1">
                      <BookmarkPlus className="w-3 h-3" /> Add to My Pathway
                    </button>
                    <div className="flex items-center gap-2 text-yellow-300 text-xs">
                      <Medal className="w-3 h-3" /> {rec.badge}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skill Gap Analysis */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-purple-300" />
              <h3 className="text-xl font-bold text-white">Skill Gap Analysis</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skills.map((s) => ({ skill: s.skill, current: s.current, target: s.target }))} outerRadius="80%">
                  <PolarGrid stroke="rgba(255,255,255,0.2)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} stroke="rgba(255,255,255,0.2)" />
                  <Radar name="Current" dataKey="current" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.35} />
                  <Radar name="Target" dataKey="target" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {skills.map((s) => (
                <div key={s.skill} className="text-xs">
                  <div className="flex items-center justify-between text-white/80">
                    <span>{s.skill}</span>
                    <span>
                      {s.current}% / {s.target}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600" style={{ width: `${Math.min(100, (s.current / s.target) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2"><BadgeCheck className="w-5 h-5 text-green-300" /> Quick Wins</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-white/80">• Complete one {careerTarget === 'Frontend Developer' ? 'accessibility' : 'SQL'} mini-project this week</li>
              <li className="text-white/80">• Schedule 2 practice sessions for your lowest skill</li>
              <li className="text-white/80">• Share a short write-up of what you learned</li>
            </ul>
            <button className="mt-4 w-full text-sm py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 flex items-center justify-center gap-2">
              Begin Next Quest <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}



