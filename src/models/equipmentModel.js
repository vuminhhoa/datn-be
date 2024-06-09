import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelizeConfig.js';

const Equipment = sequelize.define(
  'Equipment',
  {
    tenThietBi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    donVi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    soLuong: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    kyMaHieu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hangSanXuat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    xuatXu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    donGia: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    phanKhoa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phanLoaiNhap: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {}
);
export default Equipment;
