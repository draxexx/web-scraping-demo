const express = require("express");
const router = express.Router();

const { tiktokScrappingHandler } = require("../scraper");

router.get("/", async (req, res, next) => {
  try {
    const tiktokResult = await tiktokScrappingHandler();

    return res.json(tiktokResult);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
