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
    RoleId: {
      type: DataTypes.INTEGER,
    },
    EquipmentId: {
      type: DataTypes.INTEGER,
    },
    UserId: {
      type: DataTypes.INTEGER,
    },
    BiddingId: {
      type: DataTypes.INTEGER,
    },
  },
  {}
);

export default Activity;
