import Role from './roleModel.js';
import Permission from './permissionModel.js';
import User from './userModel.js';
import Bidding from './biddingModel.js';
import Equipment from './equipmentModel.js';
import Role_Permissions from './rolePermissionModel.js';
import Activity from './activityModel.js';

User.belongsTo(Role);

Role.belongsToMany(Permission, { through: 'Role_Permissions' });
Role.hasMany(User);

Permission.belongsToMany(Role, { through: 'Role_Permissions' });

Role_Permissions.belongsTo(Role);
Role_Permissions.belongsTo(Permission);

export {
  Role,
  Permission,
  User,
  Bidding,
  Equipment,
  Role_Permissions,
  Activity,
};
