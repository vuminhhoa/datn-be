import { Permission, Role, User } from '../models/index.js';

export async function getSettings(req, res) {
  try {
    const { type, alias } = req.query;
    if (type === 'getRoles') {
      const roles = await Role.findAll({ include: Permission });
      return res.send({ roles, success: true });
    }
    if (type === 'getPermissions') {
      const permissions = await Role.findOne({
        where: { alias: alias },
        include: Permission,
      });
      return res.send({ permissions, success: true });
    }
    return res.send({ alias, success: true });
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

export async function getRole(req, res) {
  try {
    const { id } = req.params;
    const roles = await Role.findOne({
      where: { id: id },
      include: [{ model: Permission }, { model: User }],
    });
    return res.send({ roles: roles, success: true });
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

export async function getRoles(req, res) {
  try {
    const roles = await Role.findAll();
    return res.send({ roles: roles, success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu roles thất bại',
      error: error,
    });
  }
}
