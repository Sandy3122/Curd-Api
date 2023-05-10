const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

// A temporary user database
let users = [
  { id: uuidv4(), name: 'John' },
  { id: uuidv4(), name: 'Jane' }
];

// Middleware to validate userId parameter
function validateUserId(req, res, next) {
  const { userId } = req.params;

  if (!uuidv4.isUUID(userId)) {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  next();
}

// Define route for deleting a user by userId
app.delete('/api/users/:userId', validateUserId, (req, res) => {
  const { userId } = req.params;

  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Remove the user from the database
  users.splice(userIndex, 1);

  return res.sendStatus(204);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
