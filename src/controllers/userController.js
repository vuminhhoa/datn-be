import { User, Role, Permission } from '../models/index.js';
import cloudinary from '../services/cloudinaryService.js';
import { getCloudinaryFileIdFromUrl } from '../helpers/cloudinaryHelper.js';

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    await User.destroy({
      where: {
        id: id,
      },
    });
    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Xóa người dùng thất bại',
      error: error,
    });
  }
}

export async function getListUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'image'],
      include: Role,
    });
    return res.send(users);
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu hoạt động thất bại',
      error: error,
    });
  }
}

export async function getOneUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id: id,
      },
      include: { model: Role, include: Permission },
    });
    return res.send({ user: user, success: true });
    // const accessToken = req.body;
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu user thất bại',
      error: error,
    });
  }
}

export async function updateUser(req, res) {
  try {
    const data = req.body;
    const userInDb = await User.findOne({
      where: {
        id: data.id,
      },
    });
    if (!userInDb) {
      return res.send({
        success: false,
        message: 'Người dùng không tồn tại trên hệ thống!',
      });
    }
    if (!!userInDb.image && userInDb.image !== data.image) {
      const oldImageId = getCloudinaryFileIdFromUrl({ url: userInDb.image });
      await cloudinary.uploader.destroy(oldImageId);
    }
    const result = await cloudinary.uploader.upload(data.image, {
      folder: 'user_images',
    });

    data.image = result?.secure_url;

    await User.update(data, {
      where: {
        id: data.id,
      },
    });
    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Cập nhật người dùng thất bại',
      error: error,
    });
  }
}
