import TeamsModel from '../database/models/team.model';
import ITeam from '../interfaces/ITeam';

class TeamsServices {
  static async list(): Promise<ITeam[]> {
    const teams = await TeamsModel.findAll();
    return teams;
  }

  static async find(id: number): Promise<ITeam> {
    const team = await TeamsModel.findOne({ where: { id } });
    return team as ITeam;
  }
}

export default TeamsServices;
