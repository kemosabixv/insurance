const express = require("express");
const bodyParser = require("body-parser");
const tokenRouter = require("./routes/token");
const cors = require("cors"); 
require("dotenv").config();

const app = express();
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use("/oauth", tokenRouter);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`OAuth 2.0 server running on port ${PORT}`);
});