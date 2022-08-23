import { DataTypes, Model } from 'sequelize';
import db from '.';
import TeamModel from './team.model';

class matchModel extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
  teamHome!: {
    teamName: string,
  };

  teamAway!: {
    teamName: string,
  };
}

matchModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

matchModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
matchModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });

export default matchModel;
