const express = require("express");
const bodyParser = require("body-parser");
const { tokenRouter } = require("./routes/token");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.use("/oauth/token", tokenRouter);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`OAuth 2.0 server running on port ${PORT}`);
});