import Role from './roleModel.js';
import Permission from './permissionModel.js';
import User from './userModel.js';
import Bidding from './biddingModel.js';
import Equipment from './equipmentModel.js';
import Role_Permissions from './rolePermissionModel.js';
import Activity from './activityModel.js';
import Department from './departmentModel.js';

User.belongsTo(Role);
User.belongsTo(Department);
User.hasMany(Bidding, { foreignKey: 'CreatorId' });

Equipment.belongsTo(Department);
Equipment.belongsTo(Bidding);

Bidding.belongsTo(Department);
Bidding.hasMany(Equipment);
Bidding.belongsTo(User, { as: 'Creator', foreignKey: 'CreatorId' });

Department.hasMany(User);
Department.hasMany(Equipment);
Department.hasMany(Bidding);

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
  Department,
  Role_Permissions,
  Activity,
};
