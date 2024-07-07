import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelizeConfig.js';

const Bidding = sequelize.define(
  'Bidding',
  {
    tenDeXuat: { type: DataTypes.STRING, allowNull: true },
    ngayDeXuat: { type: DataTypes.STRING, allowNull: true },
    noiDungDeXuat: { type: DataTypes.TEXT('long'), allowNull: true },
    trangThaiDeXuat: { type: DataTypes.STRING, allowNull: true },
    trangThaiHoatDong: { type: DataTypes.STRING, allowNull: true },
    ngayPheDuyetDeXuat: { type: DataTypes.DATE, allowNull: true },
    ngayTaoDeXuat: { type: DataTypes.DATE, allowNull: true },
    ngayPheDuyetHoatDong: { type: DataTypes.DATE, allowNull: true },
    ngayTaoHoatDong: { type: DataTypes.DATE, allowNull: true },
    ngayBatDauXuLy: { type: DataTypes.DATE, allowNull: true },
    yeuCauChaoGia: { type: DataTypes.JSON, allowNull: true },
    thanhLapToChuyenGiaToThamDinh: { type: DataTypes.JSON, allowNull: true },
    keHoachLuaChonNhaThau: { type: DataTypes.JSON, allowNull: true },
    eHsmt: { type: DataTypes.JSON, allowNull: true },
    eHsdt: { type: DataTypes.JSON, allowNull: true },
    kyKetThucHienHopDong: { type: DataTypes.JSON, allowNull: true },
    danhSachThietBiXemTruoc: { type: DataTypes.TEXT('long'), allowNull: true },
    isProposal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {}
);
export default Bidding;
