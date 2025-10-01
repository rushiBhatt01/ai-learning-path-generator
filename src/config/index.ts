export const config = {
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/learning-path-generator',
  },
  auth: {
    secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-here',
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },
  huggingface: {
    apiKey: process.env.HUGGINGFACE_API_KEY || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-jwt-secret-here',
  },
};
