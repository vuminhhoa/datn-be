import {
  User,
  Role,
  Permission,
  Activity,
  Department,
  Equipment,
} from '../models/index.js';
import cloudinary from '../services/cloudinaryService.js';
import { getCloudinaryFileIdFromUrl } from '../helpers/cloudinaryHelper.js';

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.send({ success: false, message: 'Người dùng không tồn tại' });
    }

    if (user.image !== null) {
      const oldImageId = getCloudinaryFileIdFromUrl({
        url: user.image,
        useExt: true,
      });
      await cloudinary.uploader.destroy(oldImageId);
    }

    await Activity.create({
      action: `đã xóa người dùng`,
      actor: req.user,
      target: {
        id: user.id,
        name: user.name || user.email,
        type: 'user',
      },
    });

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
      include: [Role, Department],
    });
    return res.send({ data: users, success: true });
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
      include: [{ model: Role, include: Permission }, { model: Department }],
    });
    if (!user) {
      return res.send({
        success: false,
        message: 'Người dùng không tồn tại',
      });
    }
    return res.send({ data: user, success: true });
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
    if (userInDb.image !== data.image) {
      if (userInDb.image !== null) {
        const oldImageId = getCloudinaryFileIdFromUrl({
          url: userInDb.image,
          useExt: true,
        });
        await cloudinary.uploader.destroy(oldImageId);
      }
      const result = await cloudinary.uploader.upload(data.image, {
        folder: 'user_images',
      });

      data.image = result?.secure_url;
    }

    await User.update(data, {
      where: {
        id: data.id,
      },
    });
    if (!data.isEditProfile && req.user.id !== data.id) {
      await Activity.create({
        actor: req.user,
        action: `đã cập nhật người dùng`,
        target: {
          id: userInDb.id,
          name: userInDb.name || userInDb.email,
          type: 'user',
        },
      });
    }

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

export async function updateProfile(req, res) {
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
    if (userInDb.image !== data.image) {
      if (userInDb.image !== null) {
        const oldImageId = getCloudinaryFileIdFromUrl({
          url: userInDb.image,
          useExt: true,
        });
        await cloudinary.uploader.destroy(oldImageId);
      }
      const result = await cloudinary.uploader.upload(data.image, {
        folder: 'user_images',
      });

      data.image = result?.secure_url;
    }

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
