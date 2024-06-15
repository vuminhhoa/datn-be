const DASHBOARD_READ = 'Xem trang tổng quan';

const USER_CREATE = 'Tạo thành viên';
const USER_READ = 'Xem chi tiết thành viên';
const USER_UPDATE = 'Cập nhật thành viên';
const USER_DELETE = 'Xóa thành viên';

const EQUIPMENT_CREATE = 'Tạo thiết bị';
const EQUIPMENT_READ = 'Xem chi tiết thiết bị';
const EQUIPMENT_UPDATE = 'Cập nhật thiết bị';
const EQUIPMENT_DELETE = 'Xóa thiết bị';

const DEPARTMENT_CREATE = 'Tạo khoa phòng';
const DEPARTMENT_READ = 'Xem chi tiết khoa phòng';
const DEPARTMENT_UPDATE = 'Cập nhật khoa phòng';
const DEPARTMENT_DELETE = 'Xóa khoa phòng';

const BIDDING_CREATE = 'Tạo hoạt động mua sắm đấu thầu';
const BIDDING_READ = 'Xem chi tiết hoạt động mua sắm đấu thầu';
const BIDDING_UPDATE = 'Cập nhật hoạt động mua sắm đấu thầu';
const BIDDING_DELETE = 'Xóa hoạt động mua sắm đấu thầu';

const ROLE_CREATE = 'Tạo vai trò';
const ROLE_READ = 'Xem chi tiết vai trò';
const ROLE_UPDATE = 'Cập nhật vai trò';
const ROLE_DELETE = 'Xóa vai trò';

const ALL_PERMISSION = [
  DASHBOARD_READ,
  USER_CREATE,
  USER_READ,
  USER_UPDATE,
  USER_DELETE,
  EQUIPMENT_CREATE,
  EQUIPMENT_READ,
  EQUIPMENT_UPDATE,
  EQUIPMENT_DELETE,
  BIDDING_CREATE,
  BIDDING_READ,
  BIDDING_UPDATE,
  BIDDING_DELETE,
  ROLE_CREATE,
  ROLE_READ,
  ROLE_UPDATE,
  ROLE_DELETE,
  DEPARTMENT_CREATE,
  DEPARTMENT_READ,
  DEPARTMENT_UPDATE,
  DEPARTMENT_DELETE,
];

const PERMISSION_GROUP = [
  'thành viên',
  'thiết bị',
  'hoạt động mua sắm đấu thầu',
  'vai trò',
];

export {
  DASHBOARD_READ,
  USER_CREATE,
  USER_READ,
  USER_UPDATE,
  USER_DELETE,
  EQUIPMENT_CREATE,
  EQUIPMENT_READ,
  EQUIPMENT_UPDATE,
  EQUIPMENT_DELETE,
  BIDDING_CREATE,
  BIDDING_READ,
  BIDDING_UPDATE,
  BIDDING_DELETE,
  ROLE_CREATE,
  ROLE_READ,
  ROLE_UPDATE,
  ROLE_DELETE,
  ALL_PERMISSION,
  PERMISSION_GROUP,
  DEPARTMENT_CREATE,
  DEPARTMENT_READ,
  DEPARTMENT_UPDATE,
  DEPARTMENT_DELETE,
};
