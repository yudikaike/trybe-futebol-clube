import { Model } from 'sequelize/types';

export default interface Match extends Model {
  id: number,
  homeTeam: { teamName: string },
  homeTeamGoals: number,
  awayTeam: { teamName: string },
  awayTeamGoals: number,
  inProgress: boolean,
}
