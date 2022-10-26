const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

async function getHTML(url) {
  const { data: html } = await axios.get(url);

  const res = cheerio.load(html);

  return res.html();
}

start = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.tiktok.com/@funnykittens711");

  const userName = await page.evaluate(() => {
    const userNameTag = document.querySelector(
      ".tiktok-b7g450-H2ShareTitle.ekmpd5l5"
    );

    return userNameTag.innerHTML;
  });

  console.log(userName);

  await browser.close();
};

module.exports = { getHTML, start };
