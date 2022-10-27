const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

async function getHTML(url) {
  const { data: html } = await axios.get(url);

  const res = cheerio.load(html);

  return res.html();
}

start = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.tiktok.com/@funnykittens711");

  const userProfile = await page.evaluate(() => {
    const image = document
      .querySelector(
        ".e1vl87hj2.tiktok-13abja1-SpanAvatarContainer-StyledAvatar.e1e9er4e0 img[src]"
      )
      .getAttribute("src");

    const userName = document.querySelector(
      "h2[data-e2e='user-title']"
    ).innerText;

    const userSubtitle = document.querySelector(
      "h1[data-e2e='user-subtitle']"
    ).innerText;

    const follows = document.querySelector(
      "strong[data-e2e='following-count']"
    ).innerText;

    const followers = document.querySelector(
      "strong[data-e2e='followers-count']"
    ).innerText;

    const likes = document.querySelector(
      "strong[data-e2e='likes-count']"
    ).innerText;

    const description = document.querySelector(
      "h2[data-e2e='user-bio']"
    ).innerText;

    const posts = document.querySelector("div[data-e2e='user-post-item-list']");

    const postDivs = posts.querySelectorAll("div[data-e2e='user-post-item']");

    const firstVideoImage = postDivs[0]
      .querySelector("img[src]")
      .getAttribute("src");

    const firstVideo = postDivs[0]
      .querySelector("video[src]")
      .getAttribute("src");

    return {
      image,
      userName,
      userSubtitle,
      follows,
      followers,
      likes,
      description,
      firstVideoImage,
      firstVideo,
    };
  });

  // userProfile.forEach((postItem) => {
  //   const item = postItem.querySelector("a[href]").getAttribute("href");
  //   console.log(item);
  // });

  console.log(userProfile);

  // const userStats = await page.evaluate(() => {
  //   const userStatsTag = document.querySelector(
  //     ".tiktok-7k173h-H2CountInfos.e1457k4r0"
  //   );

  //   return userStatsTag.innerText;
  // });

  await browser.close();
};

module.exports = { getHTML, start };
