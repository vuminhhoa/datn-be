import { Activity } from '../models/index.js';

export async function getActivities(req, res) {
  try {
    const activities = await Activity.findAll({
      order: [['createdAt', 'DESC']],
      raw: true,
    });
    const preparedActivities = activities.map((activity) => {
      return {
        ...activity,
        actor: {
          id: activity.actor.id,
          name: activity.actor.name,
          image: activity.actor.image,
        },
      };
    });
    return res.send({ data: preparedActivities, success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu thiết bị thất bại',
      error: error,
    });
  }
}
