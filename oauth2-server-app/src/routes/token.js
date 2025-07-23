const express = require("express");
const OAuth2Server = require("oauth2-server");
const model = require("../oauth/model");

const router = express.Router();
const oauth = new OAuth2Server({
  model: model,
});

router.post("/token", async (req, res) => {
  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);

  try {
    const token = await oauth.token(request, response);
    console.log("Generated token:", token);
    res.json(token);
  } catch (err) {
    res.status(err.code || 500).json(err);
  }
});

module.exports = router;