const User = require('../models/User');

async function updateProfile(userId, updates) {
  const allowed = ['name', 'phone', 'address', 'avatar'];
  const safeUpdates = {};
  allowed.forEach((key) => {
    if (updates[key] !== undefined) safeUpdates[key] = updates[key];
  });

  const user = await User.findByIdAndUpdate(userId, safeUpdates, { new: true });
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  return user;
}

module.exports = { updateProfile };
