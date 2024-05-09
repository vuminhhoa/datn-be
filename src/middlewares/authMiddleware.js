import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const auth = async (req, res, next) => {
  try {
    const accessToken = req.header('Authorization')?.split(' ')[1];
    if (!accessToken)
      return res.send({
        success: false,
        message: 'Không xác thực được người dùng!',
      });
    const data = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, decoded) {
        if (err)
          return res.send({
            success: false,
            message: 'Lỗi xác thực người dùng!',
            error: err,
          });
        return decoded;
      }
    );
    if (data.user.email) {
      const user = await User.findOne({
        where: {
          email: data.user.email,
          id: data.user.id,
          RoleId: data.user.RoleId,
        },
        attributes: ['id', 'name', 'email', 'image', 'RoleId'],
        raw: true,
      });
      if (!user)
        return res.send({
          success: false,
          message:
            'Người dùng thực hiện hành động không tồn tại trong hệ thống!',
        });
      req.user = user;
      req.accessToken = accessToken;
    } else {
      return res.send({
        success: false,
        message: 'Access token của người dùng không hợp lệ!',
      });
    }
    next();
  } catch (error) {
    return res.send({
      success: false,
      message: 'Lỗi xác thực đăng nhập!',
      error: error,
    });
  }
};
