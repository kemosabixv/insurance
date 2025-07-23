const OAuthServer = require('oauth2-server');
const model = require('../oauth/model');

const oauth = new OAuthServer({
  model: model,
  accessTokenLifetime: 3600, // 1 hour
  allowBearerTokensInQueryString: true,
});

module.exports = oauth;