import { Model } from 'sequelize/types';

interface IMatch extends Model {
  id: number,
  homeTeam: { teamName: string },
  homeTeamGoals: string,
  awayTeam: { teamName: string },
  awayTeamGoals: string,
  inProgress: boolean,
}

export default IMatch;
