import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelizeConfig.js';

const Role_Permissions = sequelize.define(
  'Role_Permissions',
  {
    RoleId: {
      type: DataTypes.INTEGER,
    },
    PermissionId: {
      type: DataTypes.INTEGER,
    },
  },
  {}
);

export default Role_Permissions;
