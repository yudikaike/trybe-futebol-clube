import TeamModel from '../database/models/team.model';
import MatchesModel from '../database/models/match.model';
import INewTeam from '../interfaces/INewTeam';
import ValidateServices from './validate.service';

class MatchesServices {
  static async list(query: boolean) {
    if (query) {
      const matches = await MatchesModel
        .findAll({ where: { inProgress: query },
          include: [
            { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
            { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
          ] });
      return matches;
    }
    const matches = await MatchesModel
      .findAll({ include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ] });
    return matches;
  }

  static async add({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: INewTeam) {
    if (homeTeam === awayTeam) {
      throw ValidateServices
        .customError(
          'EqualTeamsError',
          'It is not possible to create a match with two equal teams',
        );
    }
    const newMatch = await MatchesModel
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });
    return newMatch;
  }

  static async finish(id: number) {
    await MatchesModel.update({ inProgress: false }, { where: { id } });
  }
}

export default MatchesServices;
