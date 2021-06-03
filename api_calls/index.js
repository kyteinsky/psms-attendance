// @ts-nocheck
require("dotenv").config;
const fetch = require("node-fetch");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

const get_login_token = async () => {
  const res = await fetch(
    "https://lms-practice-school.bits-pilani.ac.in/login/index.php"
  );
  const text = await res.text();
  const dom = new JSDOM(text);
  const loginToken = dom.window.document
    .querySelector("#login > input:nth-child(3)")
    .getAttribute("value");
  // return loginToken;
  console.log(text);
};
get_login_token();

const get_session = async () => {
  const loginToken = await get_login_token();
  // URL encoded credentials
  const username = process.env.username;
  const password = process.env.pass;
  const res = await fetch(
    "https://lms-practice-school.bits-pilani.ac.in/login/index.php",
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/x-www-form-urlencoded",
        "Upgrade-Insecure-Requests": "1",
        "Sec-GPC": "1",
      },
      referrer: "https://lms-practice-school.bits-pilani.ac.in/login/index.php",
      body: `anchor=&logintoken=${loginToken}&username=${username}&password=${password}`,
      method: "POST",
      mode: "cors",
    }
  );

  const text = await res.text();
  const dom = new JSDOM(text);
  const hrefData = dom.window.document;
  // .querySelector("#action-menu-1-menu")
  // .lastChild.getAttribute("href");

  // console.log(hrefData);
  console.log("done");
  fs.writeFile("test.html", text, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const mark_attendance = async () => {
  await fetch(
    "https://lms-practice-school.bits-pilani.ac.in/lib/ajax/service.php?sesskey=BD7qzAkVFx&info=core_completion_update_activity_completion_status_manually",
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0",
        Accept: "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Sec-GPC": "1",
      },
      referrer:
        "https://lms-practice-school.bits-pilani.ac.in/course/view.php?id=1199",
      body: '[{"index":0,"methodname":"core_completion_update_activity_completion_status_manually","args":{"cmid":"2384","completed":true}}]',
      method: "POST",
      mode: "cors",
    }
  );
};
