'use strict';

const puppeteer = require("puppeteer"),
  fetch = require("node-fetch");

require("dotenv").config();
// const fs = require("fs");
// const pptr = require("puppeteer-core");


module.exports = async () => {
  try {
    const browser = await puppeteer.launch({
      // executablePath: "/usr/bin/google-chrome-stable",
      // headless: false,
      defaultViewport: { 'width': 1920, 'height': 1080 }
    });

    // const browser = await pptr.launch({
    //   executablePath: '/usr/bin/google-chrome-stable',
    //   headless: false,
    //   userDataDir: '/home/tyrell/.config/google-chrome/',
    //   args: [
    //     "--window-size=1920,1080",
    //   ],
    // });

    console.log('x');
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

    await page.goto("https://lms-practice-school.bits-pilani.ac.in/login/index.php", { waitUntil: 'networkidle2' });
    console.log('y');

    const googleButton = await page.$('div.potentialidp a.btn.btn-secondary.btn-block');
    await googleButton.click();
    console.log('z');
    await page.waitForNavigation();

    console.log(1);
    await page.screenshot({ path: 'ss.png' })


    await page.type('#identifierId', process.env.googleId, { delay: 210 });
    await page.keyboard.press('Enter');

    await page.waitForSelector('#password');

    // using vanilla js
    await page.evaluate((val) => {
      document.querySelector("#password > div > div > div > input").value = val;
      document.querySelector("#passwordNext > div > button").click();
    }, process.env.googlePass);

    console.log(2);
    await page.waitForNavigation();

    await page.goto("https://lms-practice-school.bits-pilani.ac.in/mod/attendance/view.php?id=2384", { waitUntil: 'networkidle2' });

    const getElementByXpath = (path) => document.evaluate(
      path,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;

    await page.evaluate((val) => {
      getElementByXpath("//a[contains(., 'Submit')]").scrollIntoView();
    });
    await page.screenshot({ path: 'ss2.png' })
    
    await page.evaluate(() => {
      getElementByXpath("//a[contains(., 'Submit')]").click();
    });
    
    await page.waitForNavigation();

    console.log(3);

    const pswdField = await page.$('#id_studentpassword');
    await pswdField.type('npb');
    const presentCheck = await page.$('#id_status_1129');
    await presentCheck.click();
    const submitBtn = await page.$('#id_submitbutton')
    await submitBtn.click();

    console.log("attendance done ToT");
    const finalSS = await page.screenshot({ path: 'ss3.png' });

    await browser.close();

    return [finalSS, 'completed successfully'];
  } catch (e) {
    console.log(e);
    return [null, e];
  }
};
