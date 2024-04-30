import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelizeConfig.js';

const Role = sequelize.define(
  'Role',
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {}
);

export default Role;
