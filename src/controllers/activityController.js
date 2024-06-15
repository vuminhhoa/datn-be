import { Equipment, Activity, Bidding, User } from '../models/index.js';
import { formatDistanceToNow } from 'date-fns';
import viLocale from 'date-fns/locale/vi';

const timeAgo = (date) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: viLocale,
  });
};

export async function getActivities(req, res) {
  try {
    const activities = await Activity.findAll({
      order: [['createdAt', 'DESC']],
      raw: true,
    });

    const preparedData = activities.map((activity) => ({
      ...activity,
      createdAt: timeAgo(activity.createdAt),
    }));

    return res.send({ data: preparedData, success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu thiết bị thất bại',
      error: error,
    });
  }
}
