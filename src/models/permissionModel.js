import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelizeConfig.js';

const Permission = sequelize.define(
  'Permission',
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {}
);

export default Permission;
