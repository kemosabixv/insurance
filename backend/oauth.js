const jwt = require('jsonwebtoken');

const USER = { username: 'user1', password: 'pass1' };
const CLIENT = { id: 'test_client', secret: 'test_secret' };

function generateToken(username) {
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function tokenHandler(req, res) {
  const { grant_type, client_id, client_secret, username, password } = req.body;
  console.log({reqBody: req.body});

  if (
    grant_type !== 'password' ||
    client_id !== CLIENT.id ||
    client_secret !== CLIENT.secret
  ) {
    return res.status(400).json({ error: 'malformed request' });
  }

  if (username !== USER.username || password !== USER.password) {
  return res.status(401).json({ error: 'invalid_credentials' });
  }

  const access_token = generateToken(username);
  res.json({
    access_token,
    token_type: 'Bearer',
    expires_in: 3600
  });
}

module.exports = { tokenHandler };
