import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelizeConfig.js';

const Department = sequelize.define(
  'Department',
  {
    tenKhoaPhong: {
      type: DataTypes.STRING,
    },
    diaChi: {
      type: DataTypes.STRING,
    },
    soDienThoai: {
      type: DataTypes.STRING,
    },
    hinhAnh: {
      type: DataTypes.STRING,
    },
  },
  {}
);

export default Department;
