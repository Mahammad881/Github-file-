const jwt = require('jsonwebtoken');
require('dotenv').config();

const protect = (req, res, next) => {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Not authorized, token missing' });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to the request
      req.user = decoded.id;

      // Move to next middleware
      return next();
    }

    // If header is missing or malformed
    return res.status(401).json({ message: 'Not authorized, token missing or malformed' });

  } catch (error) {
    console.error('JWT error:', error.message);
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};

module.exports = { protect };
