import { Role } from 'src/enums/role.enum';

export const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    stats: { wins: 0, bestScore: 0, history: [] },
    roles: [Role.Admin],
    referals: [],
    transactions: [],
  },
  {
    id: 2,
    username: 'bighot',
    password: 'mypassword',
    stats: { wins: 0, bestScore: 0, history: [] },
    roles: [Role.User],
    referals: [],
    transactions: [],
  },
];
