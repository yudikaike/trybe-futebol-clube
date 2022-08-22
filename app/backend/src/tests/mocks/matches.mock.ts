const matchesMock = [
  {
    id: 41,
    homeTeam: { teamName: 'São Paulo' },
    homeTeamGoals: '2',
    awayTeam: { teamName: 'Internacional' },
    awayTeamGoals: '0',
    inProgress: true,
  },
  {
    id: 42,
    homeTeam: { teamName: 'Ferroviária' },
    homeTeamGoals: '1',
    awayTeam: { teamName: 'Avaí/Kindermann' },
    awayTeamGoals: '0',
    inProgress: true,
  },
  {
    id: 43,
    homeTeam: { teamName: 'Napoli-SC' },
    homeTeamGoals: '0',
    awayTeam: { teamName: 'Minas Brasília' },
    awayTeamGoals: '0',
    inProgress: true,
  },
]

const finishedMatchesMock = [
  {
    id: 1,
    homeTeam: { teamName: 'São Paulo' },
    homeTeamGoals: '1',
    awayTeam: { teamName: 'Grêmio' },
    awayTeamGoals: '1',
    inProgress: false,
  },
  {
    id: 2,
    homeTeam: { teamName: 'Internacional' },
    homeTeamGoals: '1',
    awayTeam: { teamName: 'Santos' },
    awayTeamGoals: '1',
    inProgress: false,
  },
  {
    id: 3,
    homeTeam: { teamName: 'Corinthians' },
    homeTeamGoals: '3',
    awayTeam: { teamName: 'Napoli-SC' },
    awayTeamGoals: '0',
    inProgress: false,
  },
]

const inProgressMatchesMock = [
  {
    id: 41,
    homeTeam: { teamName: 'São Paulo' },
    homeTeamGoals: '2',
    awayTeam: { teamName: 'Internacional' },
    awayTeamGoals: '0',
    inProgress: true,
  },
  {
    id: 42,
    homeTeam: { teamName: 'Ferroviária' },
    homeTeamGoals: '1',
    awayTeam: { teamName: 'Avaí/Kindermann' },
    awayTeamGoals: '0',
    inProgress: true,
  },
  {
    id: 43,
    homeTeam: { teamName: 'Napoli-SC' },
    homeTeamGoals: '0',
    awayTeam: { teamName: 'Minas Brasília' },
    awayTeamGoals: '0',
    inProgress: true,
  },
]

export { matchesMock, finishedMatchesMock, inProgressMatchesMock }
