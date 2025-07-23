const OAuth2Server = require('oauth2-server');
const USER = { id: "user1", username: "user1", password: "pass1" };
const CLIENT = { id: "test_client", secret: "test_secret" };
const clients = [
  {
    id: CLIENT.id,
    secret: CLIENT.secret,
    grants: ['password'],
    redirectUris: []
  }
];

const tokens = [];

const users = [
  {
    id: USER.id,
    username: USER.username,
    password: USER.password
  }
];

const model = {
  getClient: (clientId, clientSecret) => {
    const client = clients.find(c => c.id === clientId && c.secret === clientSecret);
    return client ? client : null;
  },

  saveToken: (token, client, user) => {
    tokens.push({ ...token, clientId: client.id, userId: user.id });
    return token;
  },

  getUser: (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    return user ? user : null;
  },

  getAccessToken: (token) => {
    const accessToken = tokens.find(t => t.accessToken === token);
    return accessToken ? accessToken : null;
  }
};

module.exports = model;