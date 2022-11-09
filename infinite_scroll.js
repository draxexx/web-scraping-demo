const scrapeInfiniteScrollItems = async (page, itemTargetCount) => {
  let items = [];

  while (itemTargetCount > items.length) {
    items = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll("#boxes > div"));
      return items.map((item) => item.innerText);
    });

    previousHeight = await page.evaluate("document.body.scrollHeight");
    await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
    await page.waitForFunction(
      `document.body.scrollHeight > ${previousHeight}`
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return items;
};

module.exports = {
  scrapeInfiniteScrollItems,
};
