import jwt from 'jsonwebtoken';
import models from 'src/db/models';

const ERROR_NO_AUTH_HEADER = 'NoAuthHeader';
const ERROR_TOKEN_EXPIRED = 'TokenExpiredError';

export function authenticateLenient(allowedClaims) {
  return function (req, res, next) {
    authenticate(req, res).then((response) => {
      req.userId = response.decoded.sub;
      return fetchUser({ id: response.decoded.sub });
    }).then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      validateUser({ user, allowedClaims });
      req.user = user;
      next();
    }).catch((response) => {
      console.log('response', response);
      const { error } = response;
      if (error.name === ERROR_NO_AUTH_HEADER) {
        res.status(401).json({ message: 'Forbidden' });
        return;
      } else if (error.name === ERROR_TOKEN_EXPIRED) {
        handleLenientTokenExpired({ req, res, next, allowedClaims });
        return;
      }

      res.status(401).json({ error, message: 'Forbidden' });
      return;
    });
  };
}

function handleLenientTokenExpired({ req, res, next, allowedClaims }) {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.decode(token);
  fetchUser({ id: decoded.sub }).then(user => {
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    validateUser({ user, allowedClaims });
    req.userId = decoded.sub;
    req.user = user;
    next();
  }).catch(e => {
    console.log('error handle lenient', e);
    res.status(401).json({ error: e, message: 'Forbidden' });
  });
}

export function getUserFromAuthToken({ req }) {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.decode(token);
  return fetchUser({ id: decoded.sub });
}

export function authenticateStrict(allowedClaims) {
  return function(req, res, next) {
    authenticate(req, res).then((response) => {
      req.userId = response.decoded.sub;
      return fetchUser({ id: response.decoded.sub });
    }).then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      validateUser({ user, allowedClaims });
      req.user = user;
      next();
    }).catch((response) => {
      console.log('ERROR ', response);
      const { decoded, error } = response;
      if (error.name === ERROR_NO_AUTH_HEADER) {
        res.status(401).json({ message: 'Forbidden' });
        return;
      } else if (error.name === ERROR_TOKEN_EXPIRED) {
        res.status(401).json({ error, message: 'Forbidden' });
        return;
      }

      res.status(401).json({ error, message: 'Forbidden' });
      return;
    });
  };
}

function fetchUser({ id }) {
  return models.users.findOne({ where: { id }});
}

function validateUser({ user, allowedClaims }) {
  if (user.claims.banned) throw(BannedUserError());
  if (!allowedClaims || !allowedClaims.length) return;
  allowedClaims.forEach(claim => {
    if (!user.claims[claim]) throw(ClaimMissingError({ claim }));
  });
}

function authenticate(req, res) {
  return new Promise((resolve, reject) => {
    const { authorization } = req.headers;

    if (!authorization) {
      reject({ error: { message: 'user not logged in', name: ERROR_NO_AUTH_HEADER }});
      return;
    }

    const token = authorization.split(' ')[1];
    const cert = process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n');
    jwt.verify(token, cert, { algorithms: ['RS256'] }, (error, decoded) => {
      console.log('decoded', decoded);
      if (error) reject({ error, decoded });
      else resolve({ error, decoded });
    });
  });
}

function ClaimMissingError({ claim }) {
  return { error: { message: 'Forbidden', name: 'claimMissing' } };
}

function BannedUserError() {
  return { error: { message: 'Forbidden', name: 'bannedUser' } };
}
