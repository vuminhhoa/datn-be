import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelizeConfig.js';

const Role = sequelize.define(
  'Role',
  {
    alias: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {}
);

export default Role;
