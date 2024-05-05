import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelizeConfig.js';

const Activity = sequelize.define(
  'Activity',
  {
    ActorId: {
      type: DataTypes.INTEGER,
    },
    action: {
      type: DataTypes.STRING,
    },
  },
  {}
);

export default Activity;
