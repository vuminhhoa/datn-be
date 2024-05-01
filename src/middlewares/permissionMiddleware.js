import { Role_Permissions, Permission } from '../models/index.js';

export const checkPermission = (permission) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      let permissions = await Role_Permissions.findAll({
        where: { RoleId: user.RoleId },
        include: { model: Permission, attributes: ['name'] },
      });
      let hasPermission =
        permissions.filter((item) => item.Permission.name === permission)
          ?.length > 0
          ? true
          : false;
      if (!hasPermission)
        return res.send({
          success: false,
          message: 'Bạn không có quyền thực hiện hành động này!',
        });
      req.user = user;
      next();
    } catch (error) {
      return res.send({
        success: false,
        message: 'Lỗi xác thực phân quyền!',
        error: error,
      });
    }
  };
};
