type EndpointGroup = 'endpointGroup01' | 'endpointGroup02' | 'endpointGroup03';

type EndpointName =
  | 'UsersController-getProfile'
  | 'UsersController-getUser'
  | 'UsersController-getAllUsers';

type Tier = 'tier1' | 'tier2';

type EndpointGroups = {
  [endpointName in EndpointName]?: {
    total: EndpointGroup;
  } & {
    [tier in Tier]?: EndpointGroup;
  };
};

type permissionOptions = {
  ttl: number;
  limit: number;
};

type PermissionTiers = {
  total: {
    default: Array<permissionOptions>;
  };
  totalPerEndpoint: {
    default: Array<permissionOptions>;
  } & {
    [endpointGroup in EndpointGroup]: Array<permissionOptions>;
  };
} & {
  [tier in Tier]: {
    default: Array<permissionOptions>;
  } & {
    [endpointGroup in EndpointGroup]: Array<permissionOptions>;
  };
};

export const permissionTiers: PermissionTiers = {
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

export const endpointGroups: EndpointGroups = {
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
    total: 'endpointGroup03',
    tier1: 'endpointGroup03',
    tier2: 'endpointGroup03',
  },
};
