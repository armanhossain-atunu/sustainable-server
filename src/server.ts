import mongoose from 'mongoose';
import app from './app';
import config from './config';

let cachedDb: typeof mongoose | null = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  if (!config.database_url) {
    throw new Error('Database URL is not provided in environment variables');
  }
  
  // Set strictQuery to false to prepare for Mongoose 7
  mongoose.set('strictQuery', false);

  const db = await mongoose.connect(config.database_url);
  cachedDb = db;
  console.log('Connected to MongoDB successfully');
  return db;
}

// For local development
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  connectToDatabase().then(() => {
    app.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}`);
    });
  }).catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
}

// For Vercel Serverless Function
export default async function handler(req: any, res: any) {
  try {
    await connectToDatabase();
  } catch (error) {
    console.error('Database connection error in Vercel handler:', error);
    return res.status(500).json({ error: 'Database connection failed' });
  }
  return app(req, res);
}
