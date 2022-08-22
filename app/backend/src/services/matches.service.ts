import TeamModel from '../database/models/team.model';
import MatchModel from '../database/models/match.model';
import { Match } from '../interfaces';
import error from '../middlewares';
import TeamsService from './teams.service';

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
    const teamHome = await TeamsService.find(+homeTeam);
    const teamAway = await TeamsService.find(+awayTeam);
    if (!teamHome || !teamAway) {
      throw error.custom('NotFoundError', 'There is no team with such id!');
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

  static async update({ homeTeamGoals, awayTeamGoals }: Match, id: number) {
    await MatchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
