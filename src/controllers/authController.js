// @ts-nocheck
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Permission, Role } from '../models/index.js';

const salt = bcrypt.genSaltSync(10);
export async function register(req, res) {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({
      where: { email: email },
    });
    if (user)
      return res.send({
        success: false,
        message: 'Tài khoản đã tồn tại trên hệ thống!',
      });
    let hashPassword = bcrypt.hashSync(password, salt);
    const createdUser = await User.create({
      ...req.body,
      password: hashPassword,
      RoleId: role ? role : 2,
    });
    await createdUser.save();
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
      include: { model: Role, include: Permission },
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
    const accessToken = jwt.sign({ user }, 'secretkey', {
      expiresIn: '7d',
    });
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
    const reqData = jwt.verify(accessToken, 'secretkey', (error, decoded) => {
      if (error) return res.send({ success: false, error: error });
      return decoded;
    });
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
      message: 'Lấy dữ liệu user thất bại',
      error: error,
    });
  }
}
