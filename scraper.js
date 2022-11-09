const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const { autoScroll } = require("./scroll_with_time");

const agent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";

async function getHTML(url) {
  const { data: html } = await axios.get(url);

  const res = cheerio.load(html);

  return res.html();
}

tiktokScrappingHandler = async (username) => {
  let browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.goto(`https://www.tiktok.com/@${username}`);
  //funnykittens711

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

        const image = post.querySelector("img[src]").getAttribute("src");
        const videoLink = post.querySelector("a[href]").getAttribute("href");
        const title = post.querySelector("img[alt]").getAttribute("alt");
        const views = post.querySelector(
          "strong[data-e2e='video-views']"
        ).innerText;

        video = {
          image,
          title,
          videoLink,
          views,
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

  await page.close();
  await browser.close();

  return userProfile;
};

facebookScrappingHandler = async (username) => {
  let browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.goto(`https://www.facebook.com/${username}`);
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  const finishTime = new Date().getTime() + 0.1 * 60 * 1000;

  await autoScroll(page, finishTime);

  await page.waitForSelector(".x1xzczws");

  const userProfile = await page.evaluate(() => {
    const username = document.querySelector(
      "h1.x1heor9g.x1qlqyl8.x1pd3egz.x1a2a7pz"
    ).innerText;

    const image = document
      .querySelector("div.x1rg5ohu.x1n2onr6.x3ajldb.x1ja2u2z image")
      .getAttribute("xlink:href");

    const followers = document.querySelectorAll(
      "a.x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.xt0b8zv.xi81zsa.x1s688f"
    );

    const followInfo = [];

    followers.forEach((item) => {
      followInfo.push(item.innerText);
    });

    const postsDivs = document.querySelectorAll(
      ".x1ja2u2z.xh8yej3.x1n2onr6.x1yztbdb"
    );

    let posts = [];

    postsDivs.forEach((item) => {
      const description = item.querySelector(
        "div[data-ad-preview='message']"
      ).innerText;

      let image;
      let video;

      if (
        item.querySelector(
          "img.x1ey2m1c.xds687c.x5yr21d.x10l6tqk.x17qophe.x13vifvy.xh8yej3.xl1xv1r"
        ) == null
      ) {
        if (item.querySelector(".xh8yej3.x5yr21d.x1lliihq") != null) {
          video = item
            .querySelector(".xh8yej3.x5yr21d.x1lliihq")
            .getAttribute("style");
        }
      } else {
        image = item
          .querySelector(
            "img.x1ey2m1c.xds687c.x5yr21d.x10l6tqk.x17qophe.x13vifvy.xh8yej3.xl1xv1r"
          )
          .getAttribute("src");
      }

      const likes = item.querySelector("span.x16hj40l").innerText;

      const comments = item.querySelectorAll(
        ".xnfveip span.x4k7w5x.x1h91t0o.x1h9r5lt.x1jfb8zj.xv2umb2.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1qrby5j"
      )[0].innerText;

      const shares = item.querySelectorAll(
        ".xnfveip span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.xlh3980.xvmahel.x1n0sxbx.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x4zkp8e.x3x7a5m.x6prxxf.xvq8zen.xo1l8bm.xi81zsa"
      )[1].innerText;

      posts.push({
        description,
        image,
        video,
        likes,
        comments,
        shares,
      });
    });

    return {
      username,
      image,
      followInfo,
      posts,
    };
  });

  await page.close();
  await browser.close();

  return userProfile;
};

notionLoginScrappingHandler = async (username) => {
  let browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.goto(`https://www.notion.so/login`);
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  await page.waitForSelector("#notion-email-input-1");
  await page.waitForSelector(".notion-focusable");

  await page.type("#notion-email-input-1", "muhamm3d_@hotmail.com");
  await page.waitForSelector("form > .notion-focusable");
  await page.click("form > .notion-focusable");

  await page.waitForSelector("#notion-password-input-2");
  await page.type("#notion-password-input-2", "8&zy9SYUDFt@");
  await page.click("form > .notion-focusable");
  await page.waitForNavigation();
  await page.screenshot({ path: "example.png" });

  await page.close();
  await browser.close();
};

module.exports = { getHTML, tiktokScrappingHandler };
