const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

async function getHTML(url) {
  const { data: html } = await axios.get(url);

  const res = cheerio.load(html);

  return res.html();
}

tiktokScrappingHandler = async () => {
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

    let videos = [];

    postDivs.forEach((post) => {
      try {
        let video;

        const firstVideoImage = post
          .querySelector("img[src]")
          .getAttribute("src");

        const firstVideoTitle = post
          .querySelector("img[alt]")
          .getAttribute("alt");

        // const firstVideo = post.querySelector("video[src]").getAttribute("src");

        const firstVideoViews = post.querySelector(
          "strong[data-e2e='video-views']"
        ).innerText;

        video = {
          firstVideoImage,
          firstVideoTitle,
          // firstVideo,
          firstVideoViews,
        };

        videos.push(video);
      } catch (e) {
        console.log("error: ", e);
      }
    });

    return {
      image,
      userName,
      userSubtitle,
      follows,
      followers,
      likes,
      description,
      videos,
    };
  });

  console.log(userProfile);

  await browser.close();

  return userProfile;
};

module.exports = { getHTML, tiktokScrappingHandler };
