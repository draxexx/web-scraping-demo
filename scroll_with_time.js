async function autoScroll(page, finishTime) {
  await page.evaluate(async (finishTime) => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight || new Date().getTime() > finishTime) {
          clearInterval(timer);
          resolve();
        }
      }, 120);
    });
  }, finishTime);
}

module.exports = {
  autoScroll,
};
