import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { sequelize } from './config/sequelizeConfig.js';
import api from './routes/api.js';
import { Server as SocketIo } from 'socket.io';
import http from 'http';
import Activity from './models/activityModel.js';

const corsOptions = {
  origin: '*',
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  allowedHeaders:
    'X-Requested-With, Content-Type, x-access-token, Authorization',
  credentials: true,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 1000000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // validate: { xForwardedForHeader: false }
  // store: ... , // Redis, Memcached, etc. See below.
});

const app = express();
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const io = new SocketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'X-Requested-With',
      'Content-Type',
      'x-access-token',
      'Authorization',
    ],
    credentials: true,
  },
});

app.set('trust proxy', 1);
app.use(limiter);
app.use('/api', api);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, async () => {
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

Activity.afterCreate((newActivity) => {
  io.emit('newActivity', newActivity);
});
