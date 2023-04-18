import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {

  throw new Error("⚠️Couldn't find .env file  ⚠️");
}

export default {
  databaseURL: process.env.MONGODB_URI,
  port: process.env.PORT ?? '3000',
  jwtSecret: process.env.JWT_SECRET,
  logs: {
    level: 'info'
  },
  openAIKey: process.env.OPENAI_API_KEY,
  stripeAPIKey: process.env.STRIPE_API_KEY,
  baseUrl: process.env.BASE_URL,
  twilio: {
    authToken: process.env.TWILIO_AUTH_TOKEN
  }
};
