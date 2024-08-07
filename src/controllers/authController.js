// @ts-nocheck
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Permission, Role, Activity } from '../models/index.js';
import { STAFF } from '../const/role.js';

const salt = bcrypt.genSaltSync(10);

export async function register(req, res) {
  try {
    const { email, password, role, isCreateUser, actorId } = req.body;
    const user = await User.findOne({
      where: { email: email },
    });
    if (user)
      return res.send({
        success: false,
        message: 'Tài khoản đã tồn tại trên hệ thống!',
      });
    let hashPassword = bcrypt.hashSync(password, salt);
    const userRole = await Role.findOne({
      where: { name: STAFF },
      attributes: ['id'],
    });
    const createdUser = await User.create({
      ...req.body,
      DepartmentId: req.body.department,
      password: hashPassword,
      RoleId: role ? role : userRole.id,
    });
    await createdUser.save();
    if (isCreateUser) {
      const userActor = await User.findOne({ where: { id: actorId } });
      await Activity.create({
        actor: userActor,
        action: `đã tạo mới người dùng`,
        target: {
          id: createdUser.id,
          name: createdUser?.name || createdUser.email,
          type: 'user',
        },
      });
    }
    return res.send({ success: true, data: createdUser });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, error });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      include: {
        model: Role,
        include: { model: Permission, attributes: ['id', 'name'] },
        attributes: ['name', 'id'],
      },
    });
    const simpleUser = await User.findOne({
      where: { email },
      attributes: ['id', 'name', 'email', 'password'],
    });
    if (!user)
      return res.send({
        success: false,
        message: 'Địa chỉ email không tồn tại!',
      });
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword)
      return res.send({
        success: false,
        message: 'Tài khoản hoặc mật khẩu không chính xác',
      });
    const accessToken = jwt.sign(
      { user: simpleUser },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '7d',
      }
    );
    return res.send({
      success: true,
      data: { user, accessToken },
      message: 'Đăng nhập thành công',
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Đăng nhập thất bại',
      error: error,
    });
  }
}

export async function verify(req, res) {
  try {
    const { accessToken } = req.body;
    const reqData = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      (error, decoded) => {
        if (error) return res.send({ success: false, error: error });
        return decoded;
      }
    );
    const userInDb = await User.findOne({
      where: { email: reqData.user.email },
      include: { model: Role, include: Permission },
    });
    if (!userInDb)
      return res.send({
        success: false,
        message: 'Tài khoản không tồn tại trên hệ thống!',
      });

    const isPassword =
      JSON.stringify(userInDb.password) ===
      JSON.stringify(reqData.user.password);

    if (!isPassword)
      return res.send({
        success: false,
        message: 'Mật khẩu đã được thay đổi!',
      });

    return res.send({ user: userInDb, success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Xác thực user thất bại',
      error: error,
    });
  }
}
