import jwt from 'jsonwebtoken';
import { Department, Permission, Role, User } from '../models/index.js';

export const auth = async (req, res, next) => {
  try {
    const accessToken = req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return res.send({
        success: false,
        message: 'Không xác thực được người dùng!',
      });
    }

    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Lỗi xác thực người dùng!',
            error: err,
          });
        }
        console.log(decoded);
        if (decoded.user && decoded.user.email) {
          try {
            const user = await User.findOne({
              where: {
                email: decoded.user.email,
                id: decoded.user.id,
              },
              attributes: [
                'id',
                'name',
                'email',
                'image',
                'RoleId',
                'DepartmentId',
              ],
              include: { model: Role, include: Permission },
            });

            if (!user) {
              return res.send({
                success: false,
                message:
                  'Người dùng thực hiện hành động không tồn tại trong hệ thống!',
              });
            }

            req.user = user;
            req.accessToken = accessToken;
            next();
          } catch (dbError) {
            return res.send({
              success: false,
              message: 'Lỗi xác thực đăng nhập!',
              error: dbError,
            });
          }
        } else {
          return res.send({
            success: false,
            message: 'Access token của người dùng không hợp lệ!',
          });
        }
      }
    );
  } catch (error) {
    return res.send({
      success: false,
      message: 'Lỗi xác thực đăng nhập!',
      error: error,
    });
  }
};
