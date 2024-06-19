import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelizeConfig.js';

const Department = sequelize.define(
  'Department',
  {
    tenKhoaPhong: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    diaChi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    soDienThoai: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hinhAnh: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {}
);

export default Department;
