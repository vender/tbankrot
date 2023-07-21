import puppeteer from 'puppeteer-extra';
// const puppeteer = require('puppeteer-extra');

puppeteer.use(require('puppeteer-extra-plugin-stealth')());

let Data;

puppeteer.launch({ headless: false, devtools: true, args:['--js-flags=--noexpose_wasm']}).then(async browser => {
  const page = await browser.newPage()
  await page.setViewport({ width: 1600, height: 768});
  await page.goto('https://tbankrot.ru/', {waitUntil: 'networkidle2'});

  const loginModal = await page.waitForSelector('a#login');
  await loginModal.click();
  
  await page.type('input#lg-mail', 'syromyatnik0v@mail.ru');
  await page.type('input#lg-pas', '19801980Zz');

  const loginBtn = await page.waitForSelector('#login-btn');
  await loginBtn.click();

  await page.waitForNavigation();

  // Wait for the results page to load and display the results.
  const resultsSelector = '.layer > .content .torg';
  await page.waitForSelector(resultsSelector);

  // Extract the results from the page.
  const links = await page.evaluate(resultsSelector => {
    const anchors = Array.from(document.querySelectorAll(resultsSelector));
    return anchors.map(anchor => {
      const elem = anchor.querySelector('.info_head .num a');
      const title = elem.textContent.trim();
      return `${title} - ${elem.href}`;
      // return anchor.textContent;
    });
  }, resultsSelector);
  
  console.log(links.join('\n'));

  data = links.join('\n');

  // await page.type('#caseCourt > div > span > label > input', 'АС Краснодарского края');
  // await page.click('#b-form-submit.b-button');
  // const resultsSelector = 'div.b-found-total';
  // await page.waitForSelector(resultsSelector, { visible: true });

  // Extract the results from the page.
  // const links = await page.evaluate(resultsSelector => {
  //   const anchors = Array.from(document.querySelectorAll(resultsSelector));
  //   return anchors.map(anchor => {
  //     const title = anchor.textContent.split('|')[0].trim();
  //     return `${title} - ${anchor.href}`;
  //   });
  // }, resultsSelector);
  // console.log(links.join('\n'));

  // await browser.close()
})

export default Data;