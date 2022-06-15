import { User, userCreated } from '../../../../types/users';

const user: User = {
  id: 1,
  first_name: 'Hugo Daniel',
  last_name: 'Caxias das Virgens',
  role: 'customer',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  email: 'hugodaniel@gmail.com',
};

const userId = {
  id: 1,
  first_name: 'Hugo Daniel',
  last_name: 'Caxias das Virgens',
  email: 'hugodaniel@gmail.com',
  role: 'customer',
  Sales_Products: [],
};

const userCreated: userCreated = {
  id: 1,
  firstName: 'Hugo Daniel',
  lastName: 'Caxias das Virgens',
  role: 'customer',
  email: 'hugodaniel@gmail.com',
};

const tokenPayload = {
  id: 1,
  firstName: 'Hugo Daniel',
  lastName: 'Caxias das Virgens',
  role: 'customer',
  iat: 1655277002,
  exp: 1655449802,
};
const tokenPayloadAdmin = {
  id: 2,
  firstName: 'Hugo Daniel',
  lastName: 'Caxias das Virgens',
  role: 'admin',
  iat: 1655277002,
  exp: 1655449802,
};

// eslint-disable-next-line import/prefer-default-export
export {
  user, userCreated, tokenPayload, tokenPayloadAdmin, userId,
};
