import { DataTypes, Model } from 'sequelize';
import db from '.';

class teamModel extends Model {
  id!: number;
  teamName!: string;
}

teamModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});

export default teamModel;
