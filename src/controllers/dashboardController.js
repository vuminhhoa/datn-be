import {
  Equipment,
  Activity,
  Bidding,
  User,
  Department,
} from '../models/index.js';

export async function getDashboard(req, res) {
  try {
    const countEquipments = await Equipment.count();
    const countBiddings = await Bidding.count();
    const countUsers = await User.count();
    const countDepartments = await Department.count();
    const activities = await Activity.findAll({
      order: [['createdAt', 'DESC']],
      limit: 11,
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
    const data = {
      countDepartments,
      countEquipments,
      countUsers,
      countBiddings,
      activities: preparedActivities,
      hasNext: activities.length === 11,
    };

    return res.send({ data: data, success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu thiết bị thất bại',
      error: error,
    });
  }
}
