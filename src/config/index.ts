import dotenv from 'dotenv';
import fs from 'fs';

// Debug: show NODE_ENV early
console.log('config loader NODE_ENV=', process.env.NODE_ENV);

// Load base `.env` (production) first, then load `.env.local` when developing.
dotenv.config();
console.log('.env loaded, DATABASE_URL=', process.env.DATABASE_URL ? process.env.DATABASE_URL.split('@')[1] : process.env.DATABASE_URL);
if ((process.env.NODE_ENV || 'production') === 'development') {
  const localExists = fs.existsSync('.env.local');
  console.log('.env.local exists=', localExists);
  if (localExists) {
    dotenv.config({ path: '.env.local', override: true });
    console.log('.env.local applied, DATABASE_URL=', process.env.DATABASE_URL ? process.env.DATABASE_URL.split('@')[1] : process.env.DATABASE_URL);
  }
}

if (!process.env.JWT_SECRET) {
  console.warn("WARNING: JWT_SECRET is not set. Authentication will fail.");
}

const config = {
  jwt: {
    secret: process.env.JWT_SECRET || '',
    audience: process.env.JWT_AUDIENCE || '',
    issuer: process.env.JWT_ISSUER || '',
  },
};

export default config;
