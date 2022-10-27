const express = require("express");
const app = express();
const port = 3000;

//routes
const tiktok = require("./routes/tiktok");

app.use(express.json());

// routes
app.use("/tiktok", tiktok);

module.exports = app;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
