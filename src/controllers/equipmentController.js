// @ts-nocheck
import { Equipment, Role, Permission } from '../models/index.js';

export async function deleteEquipment(req, res) {
  try {
    const { id } = req.params;
    await Equipment.destroy({
      where: {
        id: id,
      },
    });
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
      include: { model: Role, include: Permission },
    });
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
    const data = req.body;
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
    return res.send({ data: createdEquipment, success: true });
  } catch (error) {
    console.log(error);
  }
}
