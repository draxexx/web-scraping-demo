const express = require("express");
const router = express.Router();

const { tiktokScrappingHandler } = require("../scraper");

router.get("/:username", async (req, res, next) => {
  try {
    const userName = req.params.username;
    const tiktokResult = await tiktokScrappingHandler(userName);

    return res.json(tiktokResult);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
