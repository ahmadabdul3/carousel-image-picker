import jwt from 'jsonwebtoken';

// - 1 day
const defaultExpiry = 60 * 60 * 24;

export function createJwt({ payload }) {
  const privateKey = process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n');

  return new Promise((resolve, reject) => {
    const options = { algorithm: 'RS256', expiresIn: defaultExpiry };
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(token);
    });
  });
}
