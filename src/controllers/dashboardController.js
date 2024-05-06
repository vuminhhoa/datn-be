// @ts-nocheck
import { Equipment, Activity, Bidding, User } from '../models/index.js';
import { formatDistanceToNow } from 'date-fns';
import viLocale from 'date-fns/locale/vi';


const timeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true , locale: viLocale});
  };

export async function getDashboard(req, res) {
  try {
    const equipments = await Equipment.findAll();
    const biddings = await Bidding.findAll();
    const users = await User.findAll();
    const activities = await Activity.findAll({
      order: [['createdAt', 'DESC']],
      limit: 10,
      raw: true
    });

    const data = {
      countEquipments: equipments.length,
      countUsers: users.length,
      countBidding: biddings.length,
      countNonBidding: 0,
      activities: activities.map((activity) => ({...activity, createdAt: timeAgo(activity.createdAt)})),
    };

    return res.send({ activities: data, success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu thiết bị thất bại',
      error: error,
    });
  }
}
