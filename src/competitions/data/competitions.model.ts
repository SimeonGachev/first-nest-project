import { CompetitionStatus } from '../dto/CompetitionDto';

export const competitions = [
  {
    id: 1,
    organiser: 'bighot',
    name: 'The One and Only',
    createdOn: 0,
    modifiedOn: 0,
    partitipants: ['bighot'],
    scores: {},
    status: CompetitionStatus.Open,
  },
];
