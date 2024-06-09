// @ts-nocheck
import { Equipment, Activity } from '../models/index.js';
import cloudinary from '../services/cloudinaryService.js';
import { getCloudinaryFileIdFromUrl } from '../helpers/cloudinaryHelper.js';

export async function deleteEquipment(req, res) {
  try {
    const { id } = req.params;
    const equipmentInDb = await Equipment.findOne({ where: { id: id } });
    if (!equipmentInDb) {
      return res.send({ success: false, message: 'Thiết bị không tồn tại' });
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
  try {
    const equipments = await Equipment.findAll();
    return res.send(equipments);
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
    const equipment = await Equipment.findOne({
      where: {
        id: id,
      },
    });
    if (!equipment) {
      return res.send({ success: false, message: 'Không tìm thấy thiết bị!' });
    }
    return res.send({ equipment: equipment, success: true });
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

    if (equipmentInDb.image !== data.image) {
      if (equipmentInDb.image !== null) {
        const oldImageId = getCloudinaryFileIdFromUrl({
          url: equipmentInDb.image,
        });
        await cloudinary.uploader.destroy(oldImageId);
      }
      const result = await cloudinary.uploader.upload(data.image, {
        folder: 'equipment_images',
      });

      data.image = result?.secure_url;
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
  let data = req.body;

  if (!Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ error: 'Invalid data array' });
  }

  data = data.map((item) => ({
    ...item,
    phanLoaiNhap: 'Nhập Excel',
  }));

  try {
    const createdEquipments = await Equipment.bulkCreate(data);
    await Activity.create({
      actor: req.user,
      action: `đã nhập ${data.length} thiết bị từ file excel`,
    });
    return res.send({ data: createdEquipments, success: true });
  } catch (error) {
    console.log(error);
  }
}
