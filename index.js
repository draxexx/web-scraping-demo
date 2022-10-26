const { getHTML, start } = require("./scraper");

async function go() {
  console.log(await getHTML("https://twitter.com/GalatasaraySK"));
}

start();
