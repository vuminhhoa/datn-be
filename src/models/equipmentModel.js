import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelizeConfig.js';

const Equipment = sequelize.define(
  'Equipment',
  {
    maThietBi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tenThietBi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serial: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    namSanXuat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    khoaPhong: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    trangThai: {
      type: DataTypes.STRING,
      defaultValue: 'Mới nhập',
      allowNull: true,
    },
  },
  {}
);
export default Equipment;
