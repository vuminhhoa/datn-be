import express from 'express';
import { register, login, verify } from '../controllers/authController.js';
import {
  getOneUser,
  getListUsers,
  deleteUser,
  updateUser,
  updateProfile,
} from '../controllers/userController.js';
import {
  getOneEquipment,
  getListEquipments,
  createEquipment,
  deleteEquipment,
  createEquipments,
  updateEquipment,
} from '../controllers/equipmentController.js';
import {
  updateBidding,
  getOneBidding,
  createBidding,
  getListBiddings,
  deleteBidding,
  approveBidding,
} from '../controllers/biddingController.js';
import {
  createRole,
  deleteRole,
  updateRole,
  getRole,
  getRoles,
} from '../controllers/roleController.js';
import {
  createDepartment,
  deleteDepartment,
  updateDepartment,
  getDepartment,
  getDepartments,
} from '../controllers/departmentController.js';
import { auth } from '../middlewares/authMiddleware.js';
import {
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
  DASHBOARD_READ,
  DEPARTMENT_READ,
  DEPARTMENT_UPDATE,
  DEPARTMENT_DELETE,
  DEPARTMENT_CREATE,
  BIDDING_APPROVE,
} from '../const/permission.js';
import { getDashboard } from '../controllers/dashboardController.js';
import { permission } from '../middlewares/permissionMiddleware.js';
import { getActivities } from '../controllers/activityController.js';

const api = express.Router();

api.get('/dashboard', auth, permission(DASHBOARD_READ), getDashboard);
api.get('/activities', auth, permission(DASHBOARD_READ), getActivities);

api.post('/auth/register', register);
api.post('/auth/login', login);
api.post('/auth/verify', verify);

api.get('/roles', auth, permission(ROLE_READ), getRoles);
api.put('/role/:id', auth, permission(ROLE_UPDATE), updateRole);
api.delete('/role/:id', auth, permission(ROLE_DELETE), deleteRole);
api.get('/role/:id', auth, permission(ROLE_READ), getRole);
api.post('/role', auth, permission(ROLE_CREATE), createRole);

api.get('/departments', auth, permission(DEPARTMENT_READ), getDepartments);
api.put(
  '/department/:id',
  auth,
  permission(DEPARTMENT_UPDATE),
  updateDepartment
);
api.delete(
  '/department/:id',
  auth,
  permission(DEPARTMENT_DELETE),
  deleteDepartment
);
api.get('/department/:id', auth, permission(DEPARTMENT_READ), getDepartment);
api.post('/department', auth, permission(DEPARTMENT_CREATE), createDepartment);

api.post('/bidding', auth, permission(BIDDING_CREATE), createBidding);
api.get('/biddings', auth, permission(BIDDING_READ), getListBiddings);
api.get('/bidding/:id', auth, permission(BIDDING_READ), getOneBidding);
api.put('/bidding/:id', auth, permission(BIDDING_UPDATE), updateBidding);
api.delete('/bidding/:id', auth, permission(BIDDING_DELETE), deleteBidding);
api.put(
  '/approveBidding/:id',
  auth,
  permission(BIDDING_APPROVE),
  approveBidding
);

api.get('/user/:id', auth, permission(USER_READ), getOneUser);
api.put('/user', auth, permission(USER_UPDATE), updateUser);
api.put('/profile', auth, updateProfile);
api.delete('/user/:id', auth, permission(USER_DELETE), deleteUser);
api.get('/users', auth, permission(USER_READ), getListUsers);

api.get('/equipment/:id', auth, permission(EQUIPMENT_READ), getOneEquipment);
api.post('/equipment', auth, permission(EQUIPMENT_CREATE), createEquipment);
api.post(
  '/equipments/importByExcel',
  auth,
  permission(EQUIPMENT_CREATE),
  createEquipments
);
api.put('/equipment/:id', auth, permission(EQUIPMENT_UPDATE), updateEquipment);
api.delete(
  '/equipment/:id',
  auth,
  permission(EQUIPMENT_DELETE),
  deleteEquipment
);
api.get('/equipments', auth, permission(EQUIPMENT_READ), getListEquipments);

export default api;
