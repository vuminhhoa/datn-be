import Role from './roleModel.js';
import Permission from './permissionModel.js';
import User from './userModel.js';
import Bidding from './biddingModel.js';
import Equipment from './equipmentModel.js';

User.belongsTo(Role);
Role.belongsToMany(Permission, { through: 'Role_Permissions' });
Role.hasMany(User);
Permission.belongsToMany(Role, { through: 'Role_Permissions' });

export { Role, Permission, User, Bidding, Equipment };
