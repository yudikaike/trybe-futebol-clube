export default interface Match {
  id: number,
  homeTeam: { teamName: string },
  homeTeamGoals: string,
  awayTeam: { teamName: string },
  awayTeamGoals: string,
  inProgress: boolean,
}
