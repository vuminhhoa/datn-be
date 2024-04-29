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
  getRole,
  getSettings,
  getRoles,
} from '../controllers/settingsController.js';
import {
  updateBidding,
  getOneBidding,
  createBidding,
  getListBiddings,
  deleteBidding,
} from '../controllers/biddingController.js';
const api = express.Router();

api.post('/auth/register', register);
api.post('/auth/login', login);
api.post('/auth/verify', verify);

api.get('/settings', getSettings);
api.get('/settings/role/:id', getRole);
api.get('/settings/roles', getRoles);

api.post('/bidding', createBidding);
api.get('/biddings', getListBiddings);
api.get('/bidding/:id', getOneBidding);
api.post('/bidding/:id', updateBidding);
api.delete('/bidding/:id', deleteBidding);

api.get('/user/:id', getOneUser);
api.post('/user', updateUser);
api.delete('/user/:id', deleteUser);
api.get('/users', getListUsers);

api.get('/equipment/:id', getOneEquipment);
api.post('/equipment', createEquipment);
api.put('/equipment', updateEquipment);
api.delete('/equipment/:id', deleteEquipment);
api.get('/equipments', getListEquipments);

export default api;
