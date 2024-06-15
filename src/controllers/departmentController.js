import { Department, Activity } from '../models/index.js';
import cloudinary from '../services/cloudinaryService.js';
import { getCloudinaryFileIdFromUrl } from '../helpers/cloudinaryHelper.js';

export async function getDepartment(req, res) {
  try {
    const { id } = req.params;
    const department = await Department.findOne({
      where: { id: id },
    });
    if (!department) {
      return res.send({
        success: false,
        message: 'Phòng ban không tồn tại',
      });
    }
    return res.send({ data: department, success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu phòng ban thất bại',
      error: error,
    });
  }
}

export async function updateDepartment(req, res) {
  try {
    const data = req.body;
    const [departmentInDb, departmentNameInDb] = await Promise.all([
      Department.findOne({
        where: {
          id: data.id,
        },
      }),
      Department.findOne({
        where: {
          tenKhoaPhong: data.tenKhoaPhong,
        },
      }),
    ]);

    if (departmentNameInDb && departmentNameInDb.id !== data.id) {
      return res.send({
        success: false,
        message: 'Khoa phòng đã tồn tại trên hệ thống!',
      });
    }

    if (!departmentInDb) {
      return res.send({
        success: false,
        message: 'Khoa phòng không tồn tại trên hệ thống!',
      });
    }
    if (data.hinhAnh && departmentInDb.hinhAnh !== data.hinhAnh) {
      if (departmentInDb.hinhAnh !== null) {
        const oldImageId = getCloudinaryFileIdFromUrl({
          url: departmentInDb.hinhAnh,
          useExt: true,
        });
        await cloudinary.uploader.destroy(oldImageId);
      }
      const result = await cloudinary.uploader.upload(data.hinhAnh, {
        folder: 'department_images',
      });

      data.hinhAnh = result?.secure_url;
    }

    await Department.update(data, {
      where: {
        id: data.id,
      },
    });

    await Activity.create({
      actor: req.user,
      action: `đã cập nhật phòng ban`,
      target: {
        id: departmentInDb.id,
        name: departmentInDb.tenKhoaPhong,
        type: 'department',
      },
    });
    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Cập nhật phòng ban thất bại',
      error: error,
    });
  }
}

export async function deleteDepartment(req, res) {
  try {
    const { id } = req.params;
    const departmentInDb = await Department.findOne({
      where: {
        id: id,
      },
    });

    if (!departmentInDb) {
      return res.send({
        success: false,
        message: 'Phòng ban không tồn tại',
      });
    }

    if (departmentInDb.hinhAnh) {
      const oldImageId = getCloudinaryFileIdFromUrl({
        url: departmentInDb.hinhAnh,
        useExt: true,
      });
      await cloudinary.uploader.destroy(oldImageId);
    }

    await Activity.create({
      actor: req.user,
      action: `đã xóa phòng ban`,
      target: {
        id: departmentInDb.id,
        name: departmentInDb.tenKhoaPhong,
        type: 'department',
      },
    });
    await departmentInDb.destroy();

    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Xóa phòng ban thất bại',
      error: error,
    });
  }
}

export async function createDepartment(req, res) {
  try {
    const data = req.body;
    const departmentInDb = await Department.findOne({
      where: {
        tenKhoaPhong: data.tenKhoaPhong,
      },
    });
    if (departmentInDb) {
      return res.send({
        success: false,
        message: 'Phòng ban đã tồn tại',
      });
    }

    if (data.hinhAnh) {
      const result = await cloudinary.uploader.upload(data.hinhAnh, {
        folder: 'department_images',
      });

      data.hinhAnh = result?.secure_url;
    }

    const newDepartment = await Department.create(data);

    await Activity.create({
      actor: req.user,
      action: `đã tạo phòng ban`,
      target: {
        id: newDepartment.id,
        name: newDepartment.tenKhoaPhong,
        type: 'department',
      },
    });
    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Tạo phòng ban thất bại',
      error: error,
    });
  }
}

export async function getDepartments(req, res) {
  try {
    const departments = await Department.findAll();
    return res.send({ data: departments, success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu phòng ban thất bại',
      error: error,
    });
  }
}
