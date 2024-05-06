import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelizeConfig.js';

const Activity = sequelize.define(
  'Activity',
  {
    action: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {}
);

export default Activity;
