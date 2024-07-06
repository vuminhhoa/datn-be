import { Activity } from '../models/index.js';

export async function getActivities(req, res) {
  try {
    const activities = await Activity.findAll({
      order: [['createdAt', 'DESC']],
      raw: true,
    });

    return res.send({ data: activities, success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu thiết bị thất bại',
      error: error,
    });
  }
}
