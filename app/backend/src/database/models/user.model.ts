import { DataTypes, Model } from 'sequelize';
import db from '.';

class userModel extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

userModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  sequelize: db,
  modelName: 'user',
  timestamps: false,
});

export default userModel;
