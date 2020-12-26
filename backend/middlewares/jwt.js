import jwt from 'jsonwebtoken';
// https://github.com/auth0/node-jsonwebtoken
// https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx

export const genToken = (data) => {
  return jwt.sign(data, new Buffer.from(process.env.JWT_KEY, 'base64'), {
    expiresIn: '1h',
  });
};

export const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, new Buffer.from(process.env.JWT_KEY, 'base64'));
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'auth failed' });
  }
};
