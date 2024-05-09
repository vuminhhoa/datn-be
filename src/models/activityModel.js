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
    actor: {
      type: DataTypes.JSON,
    },
    target: {
      type: DataTypes.JSON,
    },
  },
  {}
);

export default Activity;
