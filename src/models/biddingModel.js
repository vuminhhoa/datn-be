import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelizeConfig.js';

const Bidding = sequelize.define(
  'Bidding',
  {
    tenDeXuat: { type: DataTypes.STRING, allowNull: true },
    khoaPhongDeXuat: { type: DataTypes.STRING, allowNull: true },
    ngayDeXuat: { type: DataTypes.STRING, allowNull: true },
    noiDungDeXuat: { type: DataTypes.STRING, allowNull: true },
    trangThaiDeXuat: { type: DataTypes.STRING, allowNull: true },
    ngayPheDuyetDeXuat: { type: DataTypes.STRING, allowNull: true },
    ngayDangYeuCauChaoGia: { type: DataTypes.STRING, allowNull: true },
    ngayHetHanYeuCauChaoGia: { type: DataTypes.STRING, allowNull: true },
    ngayHopHoiDongMuaSam: { type: DataTypes.STRING, allowNull: true },
    ngayPheDuyetDuToan: { type: DataTypes.STRING, allowNull: true },
    taiLieuPheDuyetDuToan: { type: DataTypes.STRING, allowNull: true },
    taiLieuHopHoiDongMuaSam: { type: DataTypes.STRING, allowNull: true },
    ngayThanhLapToChuyenGia: { type: DataTypes.STRING, allowNull: true },
    taiLieuThanhLapToChuyenGia: { type: DataTypes.STRING, allowNull: true },
    ngayThanhLapToThamDinh: { type: DataTypes.STRING, allowNull: true },
    taiLieuThanhLapToThamDinh: { type: DataTypes.STRING, allowNull: true },
    ngayLapKhlcnt: { type: DataTypes.STRING, allowNull: true },
    taiLieuLapKhlcnt: { type: DataTypes.STRING, allowNull: true },
    ngayBaoCaoThamDinhKhclnt: { type: DataTypes.STRING, allowNull: true },
    taiLieuBaoCaoThamDinhKhclnt: { type: DataTypes.STRING, allowNull: true },
    ngayPheDuyetKhclnt: { type: DataTypes.STRING, allowNull: true },
    taiLieuPheDuyetKhclnt: { type: DataTypes.STRING, allowNull: true },
    ngayQuyetDinhPheDuyetKhlcnt: { type: DataTypes.STRING, allowNull: true },
    taiLieuQuyetDinhPheDuyetKhlcnt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ngayDangTaiKeHoachLenMangDauThau: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    taiLieuDuThaoEhsmt: { type: DataTypes.STRING, allowNull: true },
    ngayDuThaoEhsmt: { type: DataTypes.STRING, allowNull: true },
    taiLieuBcXayDungEhsmt: { type: DataTypes.STRING, allowNull: true },
    ngayTaiLieuBcXayDungEhsmt: { type: DataTypes.STRING, allowNull: true },
    taiLieuPheDuyetEhsmtToChuyenGia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ngayPheDuyetEhsmtToChuyenGia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    taiLieuBcThamDinhEhsmt: { type: DataTypes.STRING, allowNull: true },
    ngayBcThamDinhEhsmt: { type: DataTypes.STRING, allowNull: true },
    taiLieuPheDuyetEhsmtToThamDinh: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ngayPheDuyetEhsmtToThamDinh: { type: DataTypes.STRING, allowNull: true },
    taiLieuQuyetDinhPheDuyetEhsmt: { type: DataTypes.STRING, allowNull: true },
    ngayPheDuyetEhsmt: { type: DataTypes.STRING, allowNull: true },
    ngayDangThongBaoMoiThauLenMangDauThau: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    taiLieuBcDanhGiaCuaToChuyenGia: { type: DataTypes.STRING, allowNull: true },
    ngayBcDanhGiaCuaToChuyenGia: { type: DataTypes.STRING, allowNull: true },
    taiLieuBienBanThuongThaoVoiCacNhaThau: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ngayThuongThaoVoiCacNhaThau: { type: DataTypes.STRING, allowNull: true },
    taiLieuBcThamDinhKetQuaLcnt: { type: DataTypes.STRING, allowNull: true },
    ngayThamDinhKetQuaLcnt: { type: DataTypes.STRING, allowNull: true },
    taiLieuToTrinhXinPheDuyetKetQuaLcnt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ngayXinPheDuyetKetQuaLcnt: { type: DataTypes.STRING, allowNull: true },
    taiLieuQuyetDinhPheDuyetKetQuaLcnt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ngayPheDuyetKetQuaLcnt: { type: DataTypes.STRING, allowNull: true },
    taiLieuThongBaoKqLcntDenCacNhaThau: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ngayThongBaoKqLcntDenCacNhaThau: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    taiLieuDangKqLcntLenMangDauThau: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ngayDangKqLcntLenMangDauThau: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    taiLieuBaoLanhThucHienHopDong: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ngayNhaThauNopBaoLanhThucHienHopDong: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    taiLieuKyKetHopDongMuaBan: { type: DataTypes.STRING, allowNull: true },
    ngayKyKetHopDongMuaBan: { type: DataTypes.STRING, allowNull: true },
    taiLieuBanGiaoDuaVaoSuDung: { type: DataTypes.STRING, allowNull: true },
    ngayBanGiaoDuaVaoSuDung: { type: DataTypes.STRING, allowNull: true },
    taiLieuBaoLanhBaoHanh: { type: DataTypes.STRING, allowNull: true },
    ngayNopBaoLanhBaoHanh: { type: DataTypes.STRING, allowNull: true },
  },
  {}
);
export default Bidding;
