'use strict';

const puppeteer = require("puppeteer");
require("dotenv").config();
// const fs = require("fs");
// const pptr = require("puppeteer-core");

const fn = async () => {
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

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);

  await page.goto("https://lms-practice-school.bits-pilani.ac.in/mod/attendance/view.php?id=2384");
  await page.waitForNavigation();

  const googleButton = await page.$('div.potentialidp a.btn.btn-secondary.btn-block');
  await googleButton.click();
  await page.waitForNavigation();

  console.log(1);


  await page.type('#identifierId', process.env.googleId, { delay: 210 });
  await page.keyboard.press('Enter');

  await page.waitForSelector('#password');

  // using vanilla js
  await page.evaluate((val) => {
    document.querySelector("#password > div > div > div > input").value = val;
    document.querySelector("#passwordNext > div > button").click();
  }, process.env.googlePass);

  // const psField = await page.$("#password > div > div > div > input");
  // console.log(1);
  // await page.type('input[type="password"]', pasprocess.env.googlePasssword, { delay: 10 });
  // await psField.type(process.env.googlePass);
  // console.log(2);
  // await page.keyboard.press('Enter');
  // const nextBtn = await page.$("#passwordNext > div > button");
  // await nextBtn.click();
  
  console.log(2);
  await page.waitForNavigation();

  // const submitAttBtn = await page.$x("//a[contains(., 'Submit')]");
  await page.evaluate(() => {
    const getElementByXpath = (path) => document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    getElementByXpath("//a[contains(., 'Submit')]").click();
  });
  
  // await submitAttBtn.click();
  await page.waitForNavigation();

  console.log(3);

  const pswdField = await page.$('#id_studentpassword');
  await pswdField.type('npb');
  const presentCheck = await page.$('#id_status_1129');
  await presentCheck.click();
  const submitBtn = await page.$('#id_submitbutton')
  await submitBtn.click();

  console.log("attendance done ToT");
  alert('okay done')

  await browser.close();
};

module.exports = {
  fn,
};
