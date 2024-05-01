import express from 'express';
import { register, login, verify } from '../controllers/authController.js';
import {
  getOneUser,
  getListUsers,
  deleteUser,
  updateUser,
} from '../controllers/userController.js';
import {
  getOneEquipment,
  getListEquipments,
  createEquipment,
  deleteEquipment,
  updateEquipment,
} from '../controllers/equipmentController.js';
import {
  updateBidding,
  getOneBidding,
  createBidding,
  getListBiddings,
  deleteBidding,
} from '../controllers/biddingController.js';
import {
  createRole,
  deleteRole,
  updateRole,
  getRole,
  getRoles,
} from '../controllers/roleController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
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
} from '../const/permission.js';
import { checkPermission } from '../middlewares/permissionMiddleware.js';
const api = express.Router();

api.post('/auth/register', register);
api.post('/auth/login', login);
api.post('/auth/verify', verify);

api.get('/roles', authMiddleware, checkPermission(ROLE_READ), getRoles);
api.post('/role/:id', authMiddleware, checkPermission(ROLE_UPDATE), updateRole);
api.delete(
  '/role/:id',
  authMiddleware,
  checkPermission(ROLE_DELETE),
  deleteRole
);
api.get('/role/:id', authMiddleware, checkPermission(ROLE_READ), getRole);
api.post('/role', authMiddleware, checkPermission(ROLE_CREATE), createRole);

api.post(
  '/bidding',
  authMiddleware,
  checkPermission(BIDDING_CREATE),
  createBidding
);
api.get(
  '/biddings',
  authMiddleware,
  checkPermission(BIDDING_READ),
  getListBiddings
);
api.get(
  '/bidding/:id',
  authMiddleware,
  checkPermission(BIDDING_READ),
  getOneBidding
);
api.post(
  '/bidding/:id',
  authMiddleware,
  checkPermission(BIDDING_UPDATE),
  updateBidding
);
api.delete(
  '/bidding/:id',
  authMiddleware,
  checkPermission(BIDDING_DELETE),
  deleteBidding
);

api.get('/user/:id', authMiddleware, checkPermission(USER_READ), getOneUser);
api.post('/user', authMiddleware, checkPermission(USER_UPDATE), updateUser);
api.delete(
  '/user/:id',
  authMiddleware,
  checkPermission(USER_DELETE),
  deleteUser
);
api.get('/users', authMiddleware, checkPermission(USER_READ), getListUsers);

api.get(
  '/equipment/:id',
  authMiddleware,
  checkPermission(EQUIPMENT_READ),
  getOneEquipment
);
api.post(
  '/equipment',
  authMiddleware,
  checkPermission(EQUIPMENT_CREATE),
  createEquipment
);
api.put(
  '/equipment',
  authMiddleware,
  checkPermission(EQUIPMENT_UPDATE),
  updateEquipment
);
api.delete(
  '/equipment/:id',
  authMiddleware,
  checkPermission(EQUIPMENT_DELETE),
  deleteEquipment
);
api.get(
  '/equipments',
  authMiddleware,
  checkPermission(EQUIPMENT_READ),
  getListEquipments
);

export default api;
