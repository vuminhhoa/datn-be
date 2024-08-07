import {
  Permission,
  Role,
  User,
  Role_Permissions,
  Activity,
} from '../models/index.js';

export async function getRole(req, res) {
  try {
    const { id } = req.params;
    const role = await Role.findOne({
      where: { id: id },
      include: [{ model: Permission }, { model: User }],
    });
    if (!role) {
      return res.send({
        success: false,
        message: 'Vai trò không tồn tại',
      });
    }
    return res.send({ data: role, success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu vai trò thất bại',
      error: error,
    });
  }
}

export async function updateRole(req, res) {
  try {
    const { roleId, permissions } = req.body;
    const roleInDb = await Role.findOne({
      where: {
        id: roleId,
      },
      include: [
        {
          model: Permission,
          attributes: ['name'],
        },
      ],
    });

    for (const permissionInDb of roleInDb.Permissions) {
      let shouldDelete = true;
      for (const newPermission of permissions) {
        if (permissionInDb.name === newPermission) {
          shouldDelete = false;
          break;
        }
      }
      if (shouldDelete) {
        const rolePermission = await Role_Permissions.findOne({
          where: {
            RoleId: roleId,
            PermissionId: permissionInDb.Role_Permissions.PermissionId,
          },
        });
        await rolePermission.destroy();
      }
    }

    for (const newPermission of permissions) {
      let shouldCreate = true;
      const permissionInfo = await Permission.findOne({
        where: { name: newPermission },
      });
      for (const permissionInDb of roleInDb.Permissions) {
        if (newPermission === permissionInDb.name) {
          shouldCreate = false;
          break;
        }
      }
      if (shouldCreate) {
        const wasCreated = await Role_Permissions.findOne({
          where: {
            RoleId: roleId,
            PermissionId: permissionInfo.id,
          },
        });
        if (!wasCreated) {
          await Role_Permissions.create({
            RoleId: roleId,
            PermissionId: permissionInfo.id,
          });
        }
      }
    }
    await Activity.create({
      actor: req.user,
      action: `đã cập nhật vai trò`,
      target: {
        id: roleInDb.id,
        name: roleInDb.name,
        type: 'role',
      },
    });
    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Cập nhật vai trò thất bại',
      error: error,
    });
  }
}

export async function deleteRole(req, res) {
  try {
    const { id } = req.params;
    const roleInDb = await Role.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Permission,
          attributes: ['id'],
        },
        { model: User, attributes: ['id', 'RoleId'] },
      ],
    });

    if (!roleInDb) {
      return res.send({
        success: false,
        message: 'Vai trò không tồn tại',
      });
    }

    for (const permission of roleInDb.Permissions) {
      await Role_Permissions.destroy({
        where: {
          RoleId: permission.Role_Permissions.RoleId,
          PermissionId: permission.Role_Permissions.PermissionId,
        },
      });
    }

    const staffRole = await Role.findOne({ where: { name: 'Nhân viên' } });
    for (const user of roleInDb.Users) {
      await user.update({ RoleId: staffRole.id });
    }
    await Activity.create({
      actor: req.user,
      action: `đã xóa vai trò`,
      target: {
        id: roleInDb.id,
        name: roleInDb.name,
        type: 'role',
      },
    });
    await roleInDb.destroy();

    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Cập nhật vai trò thất bại',
      error: error,
    });
  }
}

export async function createRole(req, res) {
  try {
    const { name, permissions } = req.body;
    const roleInDb = await Role.findOne({
      where: {
        name: name,
      },
    });
    if (roleInDb) {
      return res.send({
        success: false,
        message: 'Vai trò đã tồn tại',
      });
    }
    const newRole = await Role.create({ name });
    for (const permission of permissions) {
      const permissionInfo = await Permission.findOne({
        where: { name: permission },
      });
      await Role_Permissions.create({
        RoleId: newRole.id,
        PermissionId: permissionInfo.id,
      });
    }
    await Activity.create({
      actor: req.user,
      action: `đã tạo vai trò`,
      target: {
        id: newRole.id,
        name: newRole.name,
        type: 'role',
      },
    });
    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Cập nhật vai trò thất bại',
      error: error,
    });
  }
}

export async function getRoles(req, res) {
  try {
    const roles = await Role.findAll({
      include: { model: Permission, attributes: ['id', 'name'] },
      attributes: ['id', 'name'],
    });
    return res.send({ data: roles, success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu roles thất bại',
      error: error,
    });
  }
}
