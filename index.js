'use strict';

// const puppeteer = require("puppeteer");
// require("dotenv").config();
// const fs = require("fs");
const pptr = require("puppeteer-core");

try {
  (async () => {
    // const browser = await puppeteer.launch({
    //   executablePath: "/usr/bin/google-chrome-stable",
    //   headless: false,
    //   defaultViewport: null,
    //   args: ["--window-size=1920,1080"],
    // });

    const browser = await pptr.launch({
      executablePath: '/usr/bin/google-chrome-stable',
      headless: false,
      userDataDir: '/home/tyrell/.config/google-chrome/',
      args: [
        "--window-size=1920,1080",
      ],
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);

    await page.goto(
      "https://lms-practice-school.bits-pilani.ac.in/login/index.php",
      { waitUntil: 'networkidle0' }
    );

    const googleButton = await page.$('div.potentialidp a.btn.btn-secondary.btn-block');
    await googleButton.click();
    await page.waitForNavigation();

    const f2019 = await page.$('li.JDAKTe:nth-child(4) > div:nth-child(1)')
    await f2019.click();
    await page.waitForNavigation();

    await page.goto(
      "https://lms-practice-school.bits-pilani.ac.in/mod/attendance/view.php?id=2384",
      { waitUntil: 'networkidle0' }
    );

    const submitAttBtn = await page.$x("//a[contains(., 'Submit')]")
    if (submitAttBtn) {
      await submitAttBtn.click();
      await page.waitForNavigation();

      const pswdField = await page.$('#id_studentpassword');
      await pswdField.type('npb');
      const presentCheck = await page.$('#id_status_1129');
      await presentCheck.click();
      const submitBtn = await page.$('#id_submitbutton')
      await submitBtn.click();

      console.log("attendance done ToT");
      alert('okay done')
    } else {
      console.log('attendance not done');
      alert('hello sir, please do it manually!');
    }

    await browser.close();
  })();
} catch (e) {
  console.error(e);
}
