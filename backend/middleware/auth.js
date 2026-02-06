const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'keyboardcat';

exports.requireAuth = (req,res,next) => {
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ message: 'Missing auth' });
  const token = auth.split(' ')[1];
  try{
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  }catch(e){ res.status(401).json({ message: 'Invalid token' }); }
};

exports.requireAdmin = (req,res,next) => {
  if(req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Admin only' });
};
