const jwt = require('jsonwebtoken');

const secret = 'Trybeer';

const createNewJWT = (payload) => {
  const jwtConfig = {
    expiresIn: '30m',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};

module.exports = createNewJWT;
