import { Model } from 'sequelize/types';

export default interface Match extends Model {
  id: number,
  homeTeam: number,
  teamHome?: { teamName: string }
  homeTeamGoals: number,
  awayTeam: number,
  teamAway?: { teamName: string }
  awayTeamGoals: number,
  inProgress: boolean,
}
