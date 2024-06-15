import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { sequelize } from './config/sequelizeConfig.js';
import api from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // validate: { xForwardedForHeader: false }
  // store: ... , // Redis, Memcached, etc. See below.
});

// Trust proxy
app.set('trust proxy', 1);

// Use CORS
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Apply rate limiter to all requests
app.use(limiter);

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, x-access-token, Authorization'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Routes
app.use('/api', api);

// Start the server
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('============================================================');
    console.log('Using', process.env.NODE_ENV, 'environment');
    console.log('============================================================');
    console.log(
      'Database HOST',
      process.env.DB_HOST,
      'PORT',
      process.env.DB_PORT
    );
    console.log('============================================================');
    console.log('Connection has been established successfully.');
    console.log('============================================================');
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
