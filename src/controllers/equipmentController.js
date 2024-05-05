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
      ActorId: req.user.id,
      action: `đã xóa thiết bị ${equipmentInDb.name}`,
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
      ActorId: req.user.id,
      action: `đã cập nhật thiết bị ${data?.name || data.code}`,
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
      ActorId: req.user.id,
      action: `đã tạo mới thiết bị ${createdEquipment.name}`,
    });
    return res.send({ data: createdEquipment, success: true });
  } catch (error) {
    console.log(error);
  }
}
