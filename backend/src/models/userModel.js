import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelizeConfig.js';

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {}
);
export default User;
