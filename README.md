# AI-Powered Personalized Learning Path Generator

A full-stack prototype web application that uses a hybrid AI approach to generate personalized learning pathways, recommend skills, and provide career guidance. The system integrates lightweight trained models (future-ready), third-party AI APIs, and real-time labour market data, with a modern, gamified, and interactive UI.

## 🚀 Features

### Core Features
- **Multi-Role Authentication**: Email/Password + Google Sign-In for Learners, Trainers, Policymakers, and Admins
- **Gamified Learning Experience**: XP system, badges, streaks, and leaderboards
- **AI-Powered Career Guidance**: Conversational chatbot with skill gap analysis
- **Real-Time Data Visualization**: Interactive charts and market insights
- **Personalized Learning Paths**: AI-generated recommendations based on goals and market demand

### User Dashboards
- **Learner Dashboard**: Avatar system, journey map, progress tracking, and recommendations
- **Trainer Dashboard**: Batch overview, progress heatmaps, and feedback tools
- **Policymaker Dashboard**: Data visualization, skill demand analysis, and policy insights
- **Admin Dashboard**: User management, content management, and system analytics

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **AI Integration**: OpenAI GPT API, HuggingFace Inference API
- **UI Components**: Radix UI primitives
- **Styling**: Glassmorphism design with neon gradients

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learning-path-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with the following variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/learning-path-generator
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   OPENAI_API_KEY=your-openai-api-key
   HUGGINGFACE_API_KEY=your-huggingface-api-key
   JWT_SECRET=your-jwt-secret-here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Getting Started
1. **Sign Up**: Create an account with your preferred role (Learner, Trainer, Policymaker, Admin)
2. **Explore**: Navigate through the different dashboards based on your role
3. **Learn**: Use the AI Career Guide for personalized recommendations
4. **Track Progress**: Monitor your learning journey with gamified elements

### Role-Based Access
- **Learners**: Access personalized learning paths, earn XP, unlock badges
- **Trainers**: Monitor learner progress, provide feedback, manage courses
- **Policymakers**: Analyze skill gaps, view market trends, generate insights
- **Admins**: Manage users, courses, skills, and system settings

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── learner/           # Learner dashboard
│   ├── trainer/           # Trainer dashboard
│   ├── policymaker/       # Policymaker dashboard
│   ├── admin/             # Admin dashboard
│   └── career-guidance/   # AI chatbot
├── components/            # Reusable components
├── lib/                   # Utility functions
├── models/                # Database models
└── config/                # Configuration files
```

## 🎨 Design System

### Theme Modes
- **Light**: Clean, minimal design with subtle gradients
- **Dark**: High-contrast dark theme with neon accents
- **Galaxy**: Futuristic theme with animated backgrounds

### UI Components
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Neon Gradients**: Vibrant color schemes with glow effects
- **Smooth Animations**: Framer Motion for page transitions and micro-interactions
- **Responsive Design**: Mobile-first approach with adaptive layouts

## 🔮 Future Enhancements

### AI Model Training Pipeline (Coming Soon)
- **Data Ingestion**: Collect and preprocess learner data
- **Feature Engineering**: Extract meaningful patterns
- **Model Training**: Train lightweight recommendation models
- **Model Validation**: Performance metrics and accuracy testing
- **Production Deployment**: Real-time model serving

### Planned Features
- AI resume generator based on learned skills
- Apprenticeship matching engine
- Skill verification and credential issuance (blockchain-ready)
- Advanced analytics and reporting
- Mobile application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

