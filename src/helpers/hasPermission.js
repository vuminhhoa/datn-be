import { ADMIN } from '../const/role.js';

export default function hasPermission(reqPermission, user) {
  if (user.Role.name === ADMIN) return true;

  const userPermissions = user.Role.Permissions;
  if (!userPermissions) return false;

  return userPermissions.find(
    (userPermisson) => userPermisson.name === reqPermission
  );
}
