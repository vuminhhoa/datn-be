// @ts-nocheck
import { Equipment, Activity, Department, Bidding } from '../models/index.js';
import cloudinary from '../services/cloudinaryService.js';
import { getCloudinaryFileIdFromUrl } from '../helpers/cloudinaryHelper.js';
import { Op } from 'sequelize';
import hasPermission from '../helpers/hasPermission.js';
import { EQUIPMENT_READ_ALL } from '../const/permission.js';

export async function deleteEquipment(req, res) {
  try {
    const { id } = req.params;
    const equipmentInDb = await Equipment.findOne({ where: { id: id } });
    if (!equipmentInDb) {
      return res.send({ success: false, message: 'Thiết bị không tồn tại' });
    }

    if (equipmentInDb.hinhAnh !== null) {
      const oldImageId = getCloudinaryFileIdFromUrl({
        url: equipmentInDb.hinhAnh,
        useExt: true,
      });
      await cloudinary.uploader.destroy(oldImageId);
    }

    await Activity.create({
      actor: req.user,
      action: `đã xóa thiết bị`,
      target: {
        id: equipmentInDb.id,
        name: equipmentInDb.tenThietBi || equipmentInDb.code,
        type: 'equipment',
      },
    });

    await equipmentInDb.destroy();

    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Xóa thiết bị thất bại',
      error: error,
    });
  }
}

export async function getListEquipments(req, res) {
  const {
    page = 1,
    limit = 10,
    search,
    sortKey = 'createdAt',
    direction = 'ASC',
    donVi,
    xuatXu,
    departmentIds,
    phanLoaiNhap,
    biddingIds,
  } = req.query;

  const offset = (page - 1) * limit;
  console.log(req.user);
  if (!req.user.DepartmentId && !hasPermission(EQUIPMENT_READ_ALL, req.user)) {
    return res.send({
      success: true,
      data: [],
      pageInfo: {
        total: 0,
        limit: 10,
      },
    });
  }
  try {
    let condition = {};

    const createCondition = (field, value) => {
      if (value) {
        condition[field] = {
          [Op.or]: value
            .split(',')
            .map((v) => ({ [Op.like]: `%${v.trim()}%` })),
        };
      }
    };

    if (departmentIds) {
      if (departmentIds.includes('none')) {
        condition.DepartmentId = { [Op.is]: null };
      } else {
        const departmentIdArray = departmentIds
          .split(',')
          .map((id) => parseInt(id.trim()));
        condition.DepartmentId = { [Op.in]: departmentIdArray };
      }
    }
    if (biddingIds) {
      if (biddingIds.includes('none')) {
        condition.BiddingId = { [Op.is]: null };
      } else {
        const biddingIdArray = biddingIds
          .split(',')
          .map((id) => parseInt(id.trim()));
        condition.BiddingId = { [Op.in]: biddingIdArray };
      }
    }
    createCondition('donVi', donVi);
    createCondition('xuatXu', xuatXu);
    createCondition('phanLoaiNhap', phanLoaiNhap);

    if (search) {
      const searchCondition = {
        [Op.or]: [
          { donVi: { [Op.like]: `%${search}%` } },
          { xuatXu: { [Op.like]: `%${search}%` } },
          { hangSanXuat: { [Op.like]: `%${search}%` } },
          { kyMaHieu: { [Op.like]: `%${search}%` } },
          { phanLoaiNhap: { [Op.like]: `%${search}%` } },
          { tenThietBi: { [Op.like]: `%${search}%` } },
        ],
      };
      condition = { ...condition, ...searchCondition };
    }

    const { rows, count } = await Equipment.findAndCountAll({
      where: condition,
      order: [[sortKey, direction]],
      include: [{ model: Department }, { model: Bidding }],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return res.send({
      success: true,
      data: rows,
      pageInfo: {
        total: count,
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu thiết bị thất bại',
      error: error,
    });
  }
}
export async function getOneEquipment(req, res) {
  try {
    const { id } = req.params;
    const { key } = req.query;

    if (key === 'kyMaHieu') {
      const equipment = await Equipment.findOne({
        where: {
          kyMaHieu: id,
        },
        include: [{ model: Department }, { model: Bidding }],
      });
      if (!equipment) {
        return res.send({
          success: false,
          message: 'Không tìm thấy thiết bị!',
        });
      }
      return res.send({ equipment: equipment, success: true });
    }

    const equipment = await Equipment.findOne({
      where: {
        id: id,
      },
      include: [{ model: Department }, { model: Bidding }],
    });
    if (!equipment) {
      return res.send({ success: false, message: 'Không tìm thấy thiết bị!' });
    }
    return res.send({ data: equipment, success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu thiết bị thất bại',
      error: error,
    });
  }
}

export async function updateEquipment(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const equipmentInDb = await Equipment.findOne({ where: { id: id } });
    if (!equipmentInDb) {
      return res.send({ success: false, message: 'Thiết bị không tồn tại' });
    }

    if (data.hinhAnh && equipmentInDb.hinhAnh !== data.hinhAnh) {
      if (equipmentInDb.hinhAnh !== null) {
        const oldImageId = getCloudinaryFileIdFromUrl({
          url: equipmentInDb.hinhAnh,
        });
        await cloudinary.uploader.destroy(oldImageId);
      }
      const result = await cloudinary.uploader.upload(data.hinhAnh, {
        folder: 'equipment_images',
      });

      data.hinhAnh = result?.secure_url;
    }
    await Activity.create({
      actor: req.user,
      action: `đã cập nhật thiết bị`,
      target: {
        id: equipmentInDb.id,
        name: equipmentInDb.tenThietBi || equipmentInDb.code,
        type: 'equipment',
      },
    });
    await Equipment.update(data, {
      where: {
        id: data.id,
      },
    });
    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Cập nhật thiết bị thất bại',
      error: error,
    });
  }
}

export async function createEquipment(req, res) {
  try {
    const data = req.body;
    const equipmentInDb = await Equipment.findOne({
      where: { kyMaHieu: data.kyMaHieu },
    });
    if (equipmentInDb) {
      return res.send({
        success: false,
        message: 'Trùng ký mã hiệu với thiết bị trong hệ thống!',
      });
    }

    if (data.hinhAnh) {
      const result = await cloudinary.uploader.upload(data.hinhAnh, {
        folder: 'equipment_images',
      });

      data.hinhAnh = result?.secure_url;
    }

    const createdEquipment = await Equipment.create({ ...data });
    await Activity.create({
      actor: req.user,
      action: `đã tạo mới thiết bị`,
      target: {
        id: createdEquipment.id,
        name: createdEquipment.tenThietBi || createdEquipment.code,
        type: 'equipment',
      },
    });
    return res.send({ data: createdEquipment, success: true });
  } catch (error) {
    console.log(error);
  }
}

export async function createEquipments(req, res) {
  let { data, BiddingId, DepartmentId } = req.body;

  if (!Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ error: 'Invalid data array' });
  }

  try {
    const existingEquipments = await Equipment.findAll({
      attributes: ['kyMaHieu'],
    });

    const existingKyMaHieu = existingEquipments.map((equip) => equip.kyMaHieu);

    const duplicates = data.filter((item) =>
      existingKyMaHieu.includes(item.kyMaHieu)
    );

    if (duplicates.length > 0) {
      return res.send({
        data: duplicates,
        success: false,
        error: 'trungThietBi',
        message: 'Có thiết bị trùng ký mã hiệu trong hệ thống',
      });
    }
    const departments = await Department.findAll();
    const preparedData = data.map((item) => {
      if (!!DepartmentId) {
        const department = departments.find(
          (dept) => dept.tenKhoaPhong === item.phanKhoa
        );
        if (department) {
          item.DepartmentId = department.id;
        }
      }

      return {
        ...item,
        BiddingId: !!BiddingId ? BiddingId : null,
        DepartmentId: !!DepartmentId ? DepartmentId : null,
        phanLoaiNhap: 'Nhập Excel',
      };
    });

    if (!!BiddingId) {
      const biddingData = await Bidding.findOne({
        where: { id: BiddingId },
      });
      await Bidding.update(
        { danhSachThietBiXemTruoc: JSON.stringify(preparedData) },
        { where: { id: BiddingId } }
      );
      await Activity.create({
        actor: req.user,
        action: `đã nhập danh sách xem trước ${data.length} thiết bị từ file excel cho hoạt động mua sắm`,
        target: {
          id: biddingData.id,
          name: biddingData.tenDeXuat,
          type: 'bidding',
        },
      });
      return res.send({ success: true });
    }
    const createdEquipments = await Equipment.bulkCreate(preparedData);
    await Activity.create({
      actor: req.user,
      action: `đã nhập ${data.length} thiết bị từ file excel`,
    });
    return res.send({ data: createdEquipments, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
