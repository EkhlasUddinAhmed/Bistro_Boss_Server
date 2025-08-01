import config from '../config';
import { USER_ROLE } from '../Modules/Auth/Auth.constant';
import { UserModel } from '../Modules/Users/User.Model';

const SuperAdmin = {
  userId: 'superAdmin2025',
  password: config.SUPER_ADMIN_PASSWORD,
  needsPasswordChange: false,
  email: 'ekhlas.hcLawyer@gmail.com',
  role: USER_ROLE.superAdmin,
  status: 'is-Active',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminAlreadyExits = await UserModel.findOne({
    role: USER_ROLE.superAdmin,
  });

  if (!isSuperAdminAlreadyExits) {
    UserModel.create(SuperAdmin);
  }
};

export default seedSuperAdmin;
