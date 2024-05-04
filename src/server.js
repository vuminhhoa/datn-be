import express from 'express';
const app = express();
const PORT = process.env.PORT || 5000;
import { sequelize } from './config/sequelizeConfig.js';
import api from './routes/api.js';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  validate: {xForwardedForHeader: false}
  // store: ... , // Redis, Memcached, etc. See below.
});

app.use(limiter);
app.enable('trust proxy')
app.use(cors({ origin: process.env.REACT_APP_BASE_URL }));
app.use(express.json({ limit: '50mb' }));
app.use('/api', api);

app.listen(PORT, async () => {
  await sequelize.sync({ alter: true });
  await sequelize.authenticate();
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
});
