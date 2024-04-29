import express from 'express';
const app = express();
const PORT = process.env.PORT || 5000;
import { sequelize } from './config/sequelizeConfig.js';
import api from './routes/api.js';
import cors from 'cors';

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use('/api', api);
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, content-type',
    'x-access-token',
    'Authorization'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // set cookie
  res.setHeader('Set-Cookie', 'visited=true; Max-Age=3000; HttpOnly, Secure');

  // Pass to next layer of middleware
  next();
});

app.listen(PORT, async () => {
  await sequelize.sync({ alter: true });
  console.log('Database sync model: OK');
  console.log('============================================================');
  await sequelize.authenticate();
  console.log('Database authenticate: OK');
  console.log('============================================================');
  console.log('Connection has been established successfully.');
  console.log('============================================================');
  console.log(`Server is running on port ${PORT}`);
});
