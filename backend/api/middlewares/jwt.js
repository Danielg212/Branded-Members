import jwt from 'jsonwebtoken';
// jsonwebtoken   --->   https://github.com/auth0/node-jsonwebtoken

// "secret key" generator   --->   https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx
// Reminder: make sure to set up a secret key in .env (the presented 'secret' is not production valid)

export const generateToken = (data) => {
  return jwt.sign(data, new Buffer.from(process.env.JWT_KEY || 'secret', 'base64'), {
    expiresIn: '1h',
  });
};

export const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No Authentication provided' });

    const decoded = jwt.verify(token, new Buffer.from(process.env.JWT_KEY || 'secret', 'base64'));
    if (!decoded) return res.status(401).json({ message: 'Authentication failed, access denied' });

    req.user = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};
