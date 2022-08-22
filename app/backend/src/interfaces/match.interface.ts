import { Model } from 'sequelize/types';

export default interface Match extends Model {
  id: number,
  homeTeam: { teamName: string },
  homeTeamGoals: string,
  awayTeam: { teamName: string },
  awayTeamGoals: string,
  inProgress: boolean,
}
