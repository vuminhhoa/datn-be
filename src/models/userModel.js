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
    phone: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    department: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {}
);
export default User;
