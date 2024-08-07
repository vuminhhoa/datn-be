import { Role_Permissions, Permission, Department } from '../models/index.js';

export const permission = (permission) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      if (user.RoleId === 1) return next();

      let permissions = await Role_Permissions.findAll({
        where: { RoleId: user.RoleId },
        include: { model: Permission, attributes: ['name'] },
      });

      let hasPermission = permissions.some(
        (item) => item.Permission.name === permission
      );

      if (!hasPermission) {
        return res.status(403).send({
          success: false,
          message: 'Bạn không có quyền thực hiện hành động này!',
        });
      }

      next();
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Lỗi xác thực phân quyền!',
        error: error.message,
      });
    }
  };
};
