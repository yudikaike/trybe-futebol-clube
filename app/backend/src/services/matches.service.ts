import TeamModel from '../database/models/team.model';
import MatchModel from '../database/models/match.model';
import { Match } from '../interfaces';
import error from '../middlewares';

export default class MatchesService {
  static list(query: boolean) {
    if (query) {
      return MatchModel.findAll({ where: { inProgress: query },
        include: [
          { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
          { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
        ] });
    }
    return MatchModel.findAll({ include: [
      { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
      { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
    ] });
  }

  static async add({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: Match) {
    if (homeTeam === awayTeam) {
      throw error
        .custom('UnauthorizedError', 'It is not possible to create a match with two equal teams');
    }
    return MatchModel.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
  }

  static async finish(id: number) {
    await MatchModel.update({ inProgress: false }, { where: { id } });
  }
}
