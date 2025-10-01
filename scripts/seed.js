const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/learning-path-generator';

// Define schemas (simplified versions for seeding)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['learner', 'trainer', 'policymaker', 'admin'], default: 'learner' },
  avatar: { type: String },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  badges: [{ type: String }],
  streak: { type: Number, default: 0 },
  lastLoginDate: { type: Date, default: Date.now },
  preferences: {
    theme: { type: String, enum: ['light', 'dark', 'galaxy'], default: 'light' },
    notifications: { type: Boolean, default: true }
  }
}, { timestamps: true });

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  xpReward: { type: Number, required: true },
  prerequisites: [{ type: String }],
  marketDemand: { type: Number, min: 0, max: 100, default: 50 }
}, { timestamps: true });

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skills: [{ type: String }],
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  duration: { type: Number, required: true },
  xpReward: { type: Number, required: true },
  content: {
    videos: [{ type: String }],
    readings: [{ type: String }],
    quizzes: [{ type: String }]
  },
  instructor: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  enrolledCount: { type: Number, default: 0 }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Skill = mongoose.model('Skill', skillSchema);
const Course = mongoose.model('Course', courseSchema);

async function seedDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully');

    // Clear existing data
    console.log('�� Clearing existing data...');
    await User.deleteMany({});
    await Skill.deleteMany({});
    await Course.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create sample skills
    console.log('📚 Creating sample skills...');
    const skills = [
      { 
        name: 'JavaScript', 
        category: 'Programming', 
        description: 'Modern JavaScript programming language',
        difficulty: 'beginner', 
        xpReward: 100, 
        marketDemand: 95 
      },
      { 
        name: 'React', 
        category: 'Frontend', 
        description: 'React library for building user interfaces',
        difficulty: 'intermediate', 
        xpReward: 150, 
        marketDemand: 88 
      },
      { 
        name: 'Python', 
        category: 'Programming', 
        description: 'Python programming language for data science and web development',
        difficulty: 'beginner', 
        xpReward: 120, 
        marketDemand: 92 
      },
      { 
        name: 'Node.js', 
        category: 'Backend', 
        description: 'Node.js runtime for server-side JavaScript',
        difficulty: 'intermediate', 
        xpReward: 140, 
        marketDemand: 85 
      },
      { 
        name: 'Machine Learning', 
        category: 'AI/ML', 
        description: 'Machine learning algorithms and techniques',
        difficulty: 'advanced', 
        xpReward: 200, 
        marketDemand: 78 
      },
      { 
        name: 'Data Science', 
        category: 'Analytics', 
        description: 'Data analysis and visualization techniques',
        difficulty: 'intermediate', 
        xpReward: 160, 
        marketDemand: 82 
      }
    ];

    const createdSkills = await Skill.insertMany(skills);
    console.log(`✅ Created ${createdSkills.length} skills`);

    // Create sample courses
    console.log('�� Creating sample courses...');
    const courses = [
      {
        title: 'JavaScript Fundamentals',
        description: 'Learn the basics of JavaScript programming from scratch',
        skills: ['JavaScript'],
        difficulty: 'beginner',
        duration: 20,
        xpReward: 200,
        instructor: 'John Doe',
        content: { 
          videos: ['intro.mp4', 'variables.mp4', 'functions.mp4'], 
          readings: ['basics.pdf', 'advanced.pdf'], 
          quizzes: ['quiz1', 'quiz2'] 
        }
      },
      {
        title: 'React Development Bootcamp',
        description: 'Complete React course covering hooks, context, and testing',
        skills: ['React', 'JavaScript'],
        difficulty: 'intermediate',
        duration: 40,
        xpReward: 400,
        instructor: 'Jane Smith',
        content: { 
          videos: ['components.mp4', 'hooks.mp4', 'testing.mp4'], 
          readings: ['react-guide.pdf'], 
          quizzes: ['react-quiz1', 'react-quiz2'] 
        }
      },
      {
        title: 'Python for Data Science',
        description: 'Master Python programming for data analysis and visualization',
        skills: ['Python', 'Data Science'],
        difficulty: 'intermediate',
        duration: 35,
        xpReward: 350,
        instructor: 'Mike Johnson',
        content: { 
          videos: ['pandas.mp4', 'numpy.mp4', 'matplotlib.mp4'], 
          readings: ['data-science.pdf'], 
          quizzes: ['python-quiz1', 'data-quiz1'] 
        }
      }
    ];

    const createdCourses = await Course.insertMany(courses);
    console.log(`✅ Created ${createdCourses.length} courses`);

    // Create sample users
    console.log('�� Creating sample users...');
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    const users = [
      {
        name: 'Alex Chen',
        email: 'alex@example.com',
        password: hashedPassword,
        role: 'learner',
        xp: 1250,
        level: 5,
        badges: ['Skill Explorer', 'Fast Learner'],
        streak: 7
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        password: hashedPassword,
        role: 'trainer',
        xp: 0,
        level: 1,
        badges: [],
        streak: 0
      },
      {
        name: 'Mike Wilson',
        email: 'mike@example.com',
        password: hashedPassword,
        role: 'learner',
        xp: 1800,
        level: 6,
        badges: ['Career Climber'],
        streak: 3
      },
      {
        name: 'Emma Davis',
        email: 'emma@example.com',
        password: hashedPassword,
        role: 'policymaker',
        xp: 0,
        level: 1,
        badges: [],
        streak: 0
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        xp: 0,
        level: 1,
        badges: [],
        streak: 0
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Sample Login Credentials:');
    console.log('Email: alex@example.com | Password: password123 (Learner)');
    console.log('Email: sarah@example.com | Password: password123 (Trainer)');
    console.log('Email: emma@example.com | Password: password123 (Policymaker)');
    console.log('Email: admin@example.com | Password: password123 (Admin)');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();