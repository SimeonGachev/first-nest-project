export const permissionTiers = {
  total: {
    default: [
      {
        ttl: 60,
        limit: 10000,
      },
      {
        ttl: 600,
        limit: 50000,
      },
    ],
  },
  totalPerEndpoint: {
    default: [
      {
        ttl: 60,
        limit: 1000,
      },
      {
        ttl: 600,
        limit: 5000,
      },
    ],
    endpointGroup01: [
      {
        ttl: 60,
        limit: 200,
      },
      {
        ttl: 600,
        limit: 500,
      },
    ],
    endpointGroup02: [
      {
        ttl: 60,
        limit: 500,
      },
      {
        ttl: 600,
        limit: 2000,
      },
    ],
    endpointGroup03: [
      {
        ttl: 60,
        limit: 1500,
      },
      {
        ttl: 600,
        limit: 5000,
      },
    ],
  },
  tier1: {
    default: [
      {
        ttl: 60,
        limit: 10,
      },
      {
        ttl: 600,
        limit: 50,
      },
    ],
    endpointGroup01: [
      {
        ttl: 60,
        limit: 2,
      },
      {
        ttl: 600,
        limit: 5,
      },
    ],
    endpointGroup02: [
      {
        ttl: 60,
        limit: 5,
      },
      {
        ttl: 600,
        limit: 20,
      },
    ],
    endpointGroup03: [
      {
        ttl: 60,
        limit: 15,
      },
      {
        ttl: 600,
        limit: 50,
      },
    ],
  },
  tier2: {
    default: [
      {
        ttl: 60,
        limit: 100,
      },
      {
        ttl: 600,
        limit: 500,
      },
    ],
    endpointGroup01: [
      {
        ttl: 60,
        limit: 20,
      },
      {
        ttl: 600,
        limit: 50,
      },
    ],
    endpointGroup02: [
      {
        ttl: 60,
        limit: 50,
      },
      {
        ttl: 600,
        limit: 200,
      },
    ],
    endpointGroup03: [
      {
        ttl: 60,
        limit: 150,
      },
      {
        ttl: 600,
        limit: 500,
      },
    ],
  },
};

export const endpointGroups = {
  'UsersController-getProfile': {
    total: 'endpointGroup01',
    tier1: 'endpointGroup01',
    tier2: 'endpointGroup01',
  },
  'UsersController-getUser': {
    total: 'endpointGroup02',
    tier1: 'endpointGroup02',
    tier2: 'endpointGroup02',
  },
  'UsersController-getAllUsers': {
    totat: 'endpointGroup03',
    tier1: 'endpointGroup03',
    tier2: 'endpointGroup03',
  },
};
