const puppeteer = require("puppeteer");
require("dotenv").config();

try {
  (async () => {
    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome-stable",
      // headless: false,
      defaultViewport: null,
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

    // selector just bcoz link might changein future
    // const npbridge = await page.$("#page-container-2 > div > div > div > a");
    // await npbridge.click();

    // #page-container-x changes from 2 to 1 on another visit
    // clicking on the button directly
    await page.mouse.click(450, 600, { delay: 100 });

    await page.waitForNavigation();

    const attBtn = await page.$(
      "#module-2384 > div > div > div:nth-child(2) > div.activity-information > div > button"
    );
    await attBtn.click();

    console.log("attendance done ToT");

    await browser.close();
  })();
} catch (e) {
  console.error(e);
}
