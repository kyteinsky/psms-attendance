const puppeteer = require("puppeteer");
require("dotenv").config();
const fs = require("fs");

try {
  (async () => {
    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome-stable",
      // headless: false,
      // defaultViewport: null,
      args: ["--window-size=1920,1080"],
    });

    // no session issues
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.setDefaultNavigationTimeout(0);

    await page.goto(
      "https://lms-practice-school.bits-pilani.ac.in/login/index.php"
    );

    const userHandle = await page.$("#username");
    await userHandle.type(process.env.username, { delay: 100 });
    const passHandle = await page.$("#password");
    await passHandle.type(process.env.pass, { delay: 120 });
    await passHandle.press("Enter"); // submit the form

    await page.waitForNavigation();

    // We're IN

    await page.goto(
      "https://lms-practice-school.bits-pilani.ac.in/mod/attendance/view.php?id=2384"
    );
    // read count
    let count;
    fs.readFile("count", "utf-8", (err, data) => {
      if (err) {
        throw err;
      }
      count = data;
    });

    if (!count) {
      throw "count is empty";
    }
    const attLink = await page.$(
      `table.generaltable > tbody > tr:nth-child(${count})`
    );
    await attLink.click();

    count++;
    fs.writeFile("count", count, (err) => {
      if (err) {
        throw err;
      }
      console.log("count file written");
    });

    console.log("attendance done ToT");

    await browser.close();
  })();
} catch (e) {
  console.error(e);
}
