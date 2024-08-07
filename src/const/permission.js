const DASHBOARD_READ = 'Xem trang tổng quan';

const USER_CREATE = 'Tạo thành viên';
const USER_READ = 'Xem chi tiết thành viên';
const USER_UPDATE = 'Cập nhật thành viên';
const USER_DELETE = 'Xóa thành viên';

const EQUIPMENT_CREATE = 'Tạo thiết bị';
const EQUIPMENT_READ = 'Xem chi tiết thiết bị';
const EQUIPMENT_UPDATE = 'Cập nhật thiết bị';
const EQUIPMENT_DELETE = 'Xóa thiết bị';
const EQUIPMENT_READ_ALL = 'Xem tất cả thiết bị';

const DEPARTMENT_CREATE = 'Tạo khoa phòng';
const DEPARTMENT_READ = 'Xem chi tiết khoa phòng';
const DEPARTMENT_UPDATE = 'Cập nhật khoa phòng';
const DEPARTMENT_DELETE = 'Xóa khoa phòng';

const BIDDING_CREATE = 'Tạo hoạt động mua sắm đấu thầu';
const BIDDING_READ = 'Xem chi tiết hoạt động mua sắm đấu thầu';
const BIDDING_UPDATE = 'Cập nhật hoạt động mua sắm đấu thầu';
const BIDDING_DELETE = 'Xóa hoạt động mua sắm đấu thầu';
const BIDDING_APPROVE = 'Phê duyệt hoạt động mua sắm đấu thầu';
const BIDDING_READ_ALL = 'Xem tất cả hoạt động mua sắm đấu thầu';

const BIDDING_PROPOSAL_CREATE = 'Tạo đề xuất hoạt động mua sắm';
const BIDDING_PROPOSAL_READ = 'Xem chi tiết đề xuất hoạt động mua sắm';
const BIDDING_PROPOSAL_UPDATE = 'Cập nhật đề xuất hoạt động mua sắm';
const BIDDING_PROPOSAL_DELETE = 'Xóa đề xuất hoạt động mua sắm';
const BIDDING_PROPOSAL_APPROVE = 'Phê duyệt đề xuất hoạt động mua sắm';
const BIDDING_PROPOSAL_READ_ALL = 'Xem tất cả đề xuất hoạt động mua sắm';

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
  EQUIPMENT_READ_ALL,
  EQUIPMENT_CREATE,
  EQUIPMENT_READ,
  EQUIPMENT_UPDATE,
  EQUIPMENT_DELETE,
  BIDDING_READ_ALL,
  BIDDING_APPROVE,
  BIDDING_CREATE,
  BIDDING_READ,
  BIDDING_UPDATE,
  BIDDING_DELETE,
  BIDDING_PROPOSAL_READ_ALL,
  BIDDING_PROPOSAL_APPROVE,
  BIDDING_PROPOSAL_CREATE,
  BIDDING_PROPOSAL_READ,
  BIDDING_PROPOSAL_UPDATE,
  BIDDING_PROPOSAL_DELETE,
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
  'khoa phòng',
  'hoạt động mua sắm đấu thầu',
  'đề xuất hoạt động mua sắm',
  'vai trò',
];

export {
  DASHBOARD_READ,
  BIDDING_READ_ALL,
  USER_CREATE,
  EQUIPMENT_READ_ALL,
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
  BIDDING_APPROVE,
  DEPARTMENT_CREATE,
  DEPARTMENT_READ,
  DEPARTMENT_UPDATE,
  DEPARTMENT_DELETE,
  BIDDING_PROPOSAL_READ_ALL,
  BIDDING_PROPOSAL_APPROVE,
  BIDDING_PROPOSAL_CREATE,
  BIDDING_PROPOSAL_READ,
  BIDDING_PROPOSAL_UPDATE,
  BIDDING_PROPOSAL_DELETE,
};
