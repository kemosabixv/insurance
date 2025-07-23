const OAuth2Server = require('oauth2-server');
const jwt = require("jsonwebtoken");
const clients = [
  {
    id: "test_client",
    clientId: "test_client", 
    secret: "test_secret",
    clientSecret: "test_secret", 
    grants: ['password'],
    redirectUris: []
  }
];

const tokens = [];

  const users = [
    {
      id: "user1",
      username: "user1",
      password: "pass1"
    }
];

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; 
const model = {
  getClient: (clientId, clientSecret) => {
    console.log("getClient called with:", clientId, clientSecret);
    console.log("Available clients:", clients);
    const client = clients.find(
      c =>
        (c.clientId === clientId || c.id === clientId) &&
        (c.clientSecret === clientSecret || c.secret === clientSecret)
    );
    if (!client) {
      console.log("No matching client found for:", clientId, clientSecret);
      return null;
    }
    console.log("Matched client:", client);

    return {
      id: client.id,
      clientId: client.clientId,
      grants: client.grants,
      redirectUris: client.redirectUris,
    };
  },

  saveToken: (token, client, user) => {
    // Create JWT payload
    const payload = {
      sub: user.id,
      username: user.username,
      client_id: client.clientId,
      exp: Math.floor(token.accessTokenExpiresAt.getTime() / 1000),
      scope: token.scope,
    };

    // Sign JWT
    const jwtToken = jwt.sign(payload, JWT_SECRET);

    const savedToken = {
      accessToken: jwtToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      client: { id: client.id, clientId: client.clientId },
      user: { id: user.id, username: user.username },
    };
    tokens.push(savedToken);
    console.log("Saved token (JWT):", savedToken);
    return savedToken;
  },

  getUser: (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    return user ? user : null;
  },

  getAccessToken: (token) => {
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      // Return the object structure expected by oauth2-server
      return {
        accessToken: token,
        accessTokenExpiresAt: new Date(payload.exp * 1000),
        user: { id: payload.sub, username: payload.username },
        client: { id: payload.client_id, clientId: payload.client_id },
        scope: payload.scope,
      };
    } catch (err) {
      console.log("Invalid JWT in getAccessToken:", err.message);
      return null;
    }
  },
};

module.exports = model;