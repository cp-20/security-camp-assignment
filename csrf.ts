import puppeteer from 'https://deno.land/x/puppeteer@16.2.0/mod.ts';
import { serve } from 'https://deno.land/std@0.153.0/http/server.ts';
import { serveDir } from 'https://deno.land/std@0.141.0/http/file_server.ts';

serve((request) => serveDir(request));

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

await page.goto('http://localhost:3000/#/login');

await page.type('#email', 'jim@juice-sh.op');
await page.type('#password', 'ncc-1701');
await page.click('#loginButton');

await sleep(1);

// const tokenCookie = (await page.cookies()).find(
//   (cookie) => cookie.name === 'token'
// );
// if (tokenCookie !== undefined) {
//   await page.setCookie({ sameSite: 'Strict', ...tokenCookie });
// }

// await sleep(1);

console.log(await page.cookies());

await page.goto('http://127.0.0.1:8000/csrf.html');

const randomUsername = Math.random().toString(36).substring(7);

console.log(`change username to ${randomUsername}`);

await page.type('#username', randomUsername);
await page.click('#submit');

await sleep(1000);

await browser.close();
