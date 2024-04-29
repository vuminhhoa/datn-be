import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelizeConfig.js';

const Permission = sequelize.define(
  'Permission',
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

export default Permission;
