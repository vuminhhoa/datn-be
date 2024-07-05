import {
  Bidding,
  Activity,
  Equipment,
  Department,
  User,
} from '../models/index.js';
import cloudinary from '../services/cloudinaryService.js';
import { getCloudinaryFileIdFromUrl } from '../helpers/cloudinaryHelper.js';
import {
  defaultEHsdt,
  defaultEHsmt,
  defaultKeHoachLuaChonNhaThau,
  defaultKyKetThucHienHopDong,
  defaultThanhLapToChuyenGiaToThamDinh,
  defaultYeuCauChaoGia,
} from '../const/biddingConst.js';

export async function createBidding(req, res) {
  try {
    const data = req.body;
    const createdBidding = await Bidding.create({ ...data });
    await Activity.create({
      actor: req.user,
      action: `đã tạo mới hoạt động mua sắm đấu thầu`,
      target: {
        id: createdBidding.id,
        name: createdBidding.tenDeXuat,
        type: 'bidding',
      },
    });
    return res.send({ data: createdBidding, success: true });
  } catch (error) {
    console.log(error);
  }
}

export async function approveBidding(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const biddingInDb = await Bidding.findOne({
      where: {
        id: id,
      },
      raw: false,
    });
    if (!biddingInDb) {
      return res.send({
        success: false,
        message: 'Hoạt động không tồn tại trên hệ thống!',
      });
    }
    let dataToUpdate = {};
    switch (data.type) {
      case 'deXuat':
        dataToUpdate = {
          trangThaiDeXuat: data.trangThaiDeXuat,
          trangThaiHoatDong:
            data.trangThaiDeXuat === 'approved' ? 'pendingProcess' : 'rejected',
          ngayTaoHoatDong: new Date().toISOString(),
          isProposal: data.trangThaiDeXuat === 'approved' ? false : true,
          ngayPheDuyetDeXuat: new Date().toISOString(),
          NguoiDuyetDeXuatId: req.user.id,
        };
        break;
      case 'hoatDong':
        dataToUpdate = {
          trangThaiHoatDong: data.trangThai,
          ngayPheDuyetHoatDong: new Date().toISOString(),
          NguoiDuyetHoatDongId: req.user.id,
        };
        break;
      default:
        break;
    }

    await Bidding.update(dataToUpdate, {
      where: {
        id: id,
      },
    });
    await Activity.create({
      actor: req.user,
      action:
        data.type === 'hoatDong'
          ? `đã phê duyệt hoạt động mua sắm đấu thầu`
          : `đã phê duyệt đề xuất mua sắm`,
      target: {
        id: id,
        name: biddingInDb.tenDeXuat,
        type: 'bidding',
      },
    });
    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Cập nhật hoạt động thất bại',
      error: error,
    });
  }
}

export async function updateBidding(req, res) {
  try {
    const data = req.body;
    let filteredData = filterFields(data, [
      'updatedAt',
      'createdAt',
      'deletedFields',
      'createdFields',
      'updatedFields',
    ]);
    const biddingInDb = await Bidding.findOne({
      where: {
        id: data.id,
      },
    });

    if (!biddingInDb) {
      return res.send({
        success: false,
        message: 'Hoạt động không tồn tại trên hệ thống!',
      });
    }

    const plainBidding = biddingInDb.get({ plain: true });
    const preparedBidding = {
      ...plainBidding,
      yeuCauChaoGia: {
        ...defaultYeuCauChaoGia,
        ...plainBidding.yeuCauChaoGia,
      },
      keHoachLuaChonNhaThau: {
        ...defaultKeHoachLuaChonNhaThau,
        ...plainBidding.keHoachLuaChonNhaThau,
      },
      thanhLapToChuyenGiaToThamDinh: {
        ...defaultThanhLapToChuyenGiaToThamDinh,
        ...plainBidding.thanhLapToChuyenGiaToThamDinh,
      },
      kyKetThucHienHopDong: {
        ...defaultKyKetThucHienHopDong,
        ...plainBidding.kyKetThucHienHopDong,
      },
      eHsmt: { ...defaultEHsmt, ...plainBidding.eHsmt },
      eHsdt: { ...defaultEHsdt, ...plainBidding.eHsdt },
    };

    if (data.deletedFields.length > 0) {
      for (const field of data.deletedFields) {
        const splitField = field.split('.');
        const obj = splitField[0];
        const key = splitField[1];
        const objDbValue = preparedBidding[obj];
        const objValue = filteredData[obj];

        const oldFileId = decodeURIComponent(
          getCloudinaryFileIdFromUrl({
            url: objDbValue[key],
            useExt: true,
          })
        );

        await cloudinary.uploader.destroy(oldFileId, {
          resource_type: 'raw',
        });
        filteredData[obj] = {
          ...objValue,
          [key]: null,
        };
      }
    }

    if (data.updatedFields.length > 0) {
      for (const field of data.updatedFields) {
        const splitField = field.split('.');
        const obj = splitField[0];
        const key = splitField[1];
        const objValue = filteredData[obj];
        const objDbValue = preparedBidding[obj];

        const oldFileId = decodeURIComponent(
          getCloudinaryFileIdFromUrl({
            url: objDbValue[key],
            useExt: true,
          })
        );
        await cloudinary.uploader.destroy(oldFileId, {
          resource_type: 'raw',
        });

        const { fileBase64, fileName } = JSON.parse(objValue[key]);
        const result = await cloudinary.uploader.upload(fileBase64, {
          folder: 'bidding_documents',
          resource_type: 'raw',
          use_filename: true,
          filename_override: fileName,
        });
        filteredData[obj] = {
          ...objValue,
          [key]: result?.secure_url,
        };
      }
    }
    if (data.createdFields.length > 0) {
      for (const field of data.createdFields) {
        const splitField = field.split('.');
        const obj = splitField[0];
        const key = splitField[1];
        const objValue = filteredData[obj];

        const { fileBase64, fileName } = JSON.parse(objValue[key]);
        const result = await cloudinary.uploader.upload(fileBase64, {
          folder: 'bidding_documents',
          resource_type: 'raw',
          use_filename: true,
          filename_override: fileName,
        });
        filteredData[obj] = {
          ...objValue,
          [key]: result?.secure_url,
        };
      }
    }

    await Bidding.update(filteredData, {
      where: {
        id: filteredData.id,
      },
    });
    await Activity.create({
      actor: req.user,
      action: `đã cập nhật hoạt động mua sắm đấu thầu`,
      target: {
        id: filteredData.id,
        name: filteredData.tenDeXuat,
        type: 'bidding',
      },
    });
    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Cập nhật hoạt động thất bại',
      error: error,
    });
  }
}

export async function deleteBidding(req, res) {
  try {
    const { id } = req.params;
    const biddingInDb = await Bidding.findOne({
      where: {
        id: id,
      },
    });

    if (!biddingInDb) {
      return res.send({
        success: false,
        message: 'Hoạt động không tồn tại trên hệ thống!',
      });
    }
    const preparedBidding = biddingInDb.get({ plain: true });
    const documentFields = pickTaiLieuFields(preparedBidding);

    if (documentFields.length > 0) {
      for (const document of documentFields) {
        const objValue = biddingInDb[document.obj];
        const oldFileId = decodeURIComponent(
          getCloudinaryFileIdFromUrl({
            url: objValue[document.field],
            useExt: true,
          })
        );
        await cloudinary.uploader.destroy(oldFileId, {
          resource_type: 'raw',
        });
      }
    }

    await Activity.create({
      actor: req.user,
      action: `đã xóa hoạt động mua sắm đấu thầu`,
      target: {
        id: biddingInDb.id,
        name: biddingInDb.tenDeXuat,
        type: 'bidding',
      },
    });

    await Bidding.destroy({
      where: {
        id: id,
      },
    });
    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Xóa hoạt động thất bại',
      error: error,
    });
  }
}

export async function getOneBidding(req, res) {
  try {
    const { id } = req.params;
    const bidding = await Bidding.findOne({
      where: {
        id: id,
      },
      include: [
        Department,
        { model: User, as: 'NguoiDuyetHoatDong', attributes: ['name', 'id'] },
        { model: User, as: 'NguoiDuyetDeXuat', attributes: ['name', 'id'] },
        { model: User, as: 'NguoiTaoHoatDong', attributes: ['name', 'id'] },
        { model: User, as: 'NguoiTaoDeXuat', attributes: ['name', 'id'] },
      ],
    });

    if (!bidding) {
      return res.send({
        success: false,
        message: 'Hoạt động không tồn tại trên hệ thống!',
      });
    }
    const plainBidding = bidding.get({ plain: true });
    return res.send({
      data: {
        ...plainBidding,
        yeuCauChaoGia: {
          ...defaultYeuCauChaoGia,
          ...plainBidding.yeuCauChaoGia,
        },
        keHoachLuaChonNhaThau: {
          ...defaultKeHoachLuaChonNhaThau,
          ...plainBidding.keHoachLuaChonNhaThau,
        },
        thanhLapToChuyenGiaToThamDinh: {
          ...defaultThanhLapToChuyenGiaToThamDinh,
          ...plainBidding.thanhLapToChuyenGiaToThamDinh,
        },
        kyKetThucHienHopDong: {
          ...defaultKyKetThucHienHopDong,
          ...plainBidding.kyKetThucHienHopDong,
        },
        eHsmt: { ...defaultEHsmt, ...plainBidding.eHsmt },
        eHsdt: { ...defaultEHsdt, ...plainBidding.eHsdt },
      },
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu hoạt động thất bại',
      error: error,
    });
  }
}

export async function getListBiddings(req, res) {
  const { isProposal } = req.query;
  try {
    const biddings = await Bidding.findAll({
      attributes: [
        'id',
        'tenDeXuat',
        'trangThaiDeXuat',
        'trangThaiHoatDong',
        'createdAt',
        'updatedAt',
      ],
      where: {
        isProposal: !!isProposal,
      },
      include: [
        {
          model: Equipment,
          attributes: ['soLuong', 'donGia'],
        },
        {
          model: Department,
          attributes: ['id', 'tenKhoaPhong'],
        },
      ],
    });
    const biddingsWithTotals = biddings.map((bidding) => {
      const plainBidding = bidding.get({ plain: true });
      const totalEquipments = plainBidding.Equipment.reduce(
        (sum, equipment) => sum + equipment.soLuong,
        0
      );
      const totalPrice = plainBidding.Equipment.reduce(
        (sum, equipment) => sum + equipment.soLuong * equipment.donGia,
        0
      );

      return {
        ...plainBidding,
        totalEquipments,
        totalPrice,
      };
    });

    return res.send({ data: biddingsWithTotals, success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu hoạt động thất bại',
      error: error,
    });
  }
}

function filterFields(obj, fieldsToRemove) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !fieldsToRemove.includes(key))
  );
}

function pickTaiLieuFields(obj) {
  const taiLieuFields = [];
  Object.keys(obj).forEach((objKey) => {
    const objValue = obj[objKey];
    if (typeof objValue === 'object' && objValue !== null) {
      Object.keys(objValue).forEach((fieldKey) => {
        if (fieldKey.startsWith('taiLieu') && objValue[fieldKey] !== null) {
          taiLieuFields.push({
            obj: objKey,
            field: fieldKey,
            value: objValue[fieldKey],
          });
        }
      });
    }
  });
  return taiLieuFields;
}
