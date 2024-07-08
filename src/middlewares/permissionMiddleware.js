import { Role_Permissions, Permission } from '../models/index.js';

export const permission = (permission) => {
  console.log(req.user);
  return async (req, res, next) => {
    try {
      const user = req.user;
      if (user.RoleId === 1) return next();

      let permissions = await Role_Permissions.findAll({
        where: { RoleId: user.RoleId },
        include: { model: Permission, attributes: ['name'] },
      });

      const plainPermissions = permissions.get({ plain: true });
      let hasPermission = plainPermissions.some(
        (item) => item.Permission.name === permission
      );

      if (!hasPermission) {
        return res.status(403).send({
          success: false,
          message: 'Bạn không có quyền thực hiện hành động này!',
        });
      }

      req.user = user;
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
