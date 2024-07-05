import Role from './roleModel.js';
import Permission from './permissionModel.js';
import User from './userModel.js';
import Bidding from './biddingModel.js';
import Equipment from './equipmentModel.js';
import Role_Permissions from './rolePermissionModel.js';
import Activity from './activityModel.js';
import Department from './departmentModel.js';

User.belongsTo(Role);
Role.hasMany(User);

User.belongsTo(Department);
Department.hasMany(User);

User.hasMany(Bidding, { foreignKey: 'NguoiTaoHoatDongId' });
Bidding.belongsTo(User, {
  as: 'NguoiTaoHoatDong',
  foreignKey: 'NguoiTaoHoatDongId',
});
User.hasMany(Bidding, { foreignKey: 'NguoiTaoDeXuatId' });
Bidding.belongsTo(User, {
  as: 'NguoiTaoDeXuat',
  foreignKey: 'NguoiTaoDeXuatId',
});
Bidding.belongsTo(User, {
  as: 'NguoiDuyetDeXuat',
  foreignKey: 'NguoiDuyetDeXuatId',
});
Bidding.belongsTo(User, {
  as: 'NguoiDuyetHoatDong',
  foreignKey: 'NguoiDuyetHoatDongId',
});

User.hasMany(Bidding, {
  foreignKey: 'NguoiDuyetDeXuatId',
});
User.hasMany(Bidding, {
  foreignKey: 'NguoiDuyetHoatDongId',
});

Equipment.belongsTo(Department);
Department.hasMany(Equipment);

Bidding.hasMany(Equipment);
Equipment.belongsTo(Bidding);

Department.hasMany(Bidding);
Bidding.belongsTo(Department);

Role.belongsToMany(Permission, { through: 'Role_Permissions' });
Role_Permissions.belongsTo(Permission);

Permission.belongsToMany(Role, { through: 'Role_Permissions' });
Role_Permissions.belongsTo(Role);

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
