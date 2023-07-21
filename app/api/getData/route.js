import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer';

export async function GET() {
    let Data;

    await puppeteer.launch({ headless: "new", devtools: true, args:['--js-flags=--noexpose_wasm']}).then(async browser => {
        const page = await browser.newPage();
        page.setJavaScriptEnabled(false);
        // page.setCookie({'name': 'pageitemcount', 'value': '50'});
        await page.setViewport({ width: 1200, height: 768});
        await page.goto('https://tbankrot.ru/login', {waitUntil: 'networkidle2'});
      
        await page.waitForSelector('#authPage');
        
        await page.type('#authPage [name="mail"]', 'venderu@gmail.com');
        await page.type('#authPage [name="pas"]', 'jxd65284hc7');
      
        page.click('#authPage [type="submit"]');
      
        await page.waitForNavigation();
      
        // Wait for the results page to load and display the results.
        const resultsSelector = '.layer > .content .torg:not(.lot)';
        await page.waitForSelector(resultsSelector);

        // const debitorList = await page.$$('.debtor');
        // debitorList.map(async (item,idx)=> {
        //   // await item.waitForSelector('a');
        //   const debitorLink = await item.$$('a');
        //   // debitorLink && debitorLink.click();
        //   // console.log(debitorLink && debitorLink.textContent);
        //   console.log(item && item.asElement());
        // });

        // Extract the results from the page.
        const links = await page.evaluate(resultsSelector => {
          const anchors = Array.from(document.querySelectorAll(resultsSelector));
          return anchors.map(anchor => {
            const elem = anchor.querySelector('.lot_info .info_head .num a');
            const title = elem.textContent.trim();
            const debtor = anchor.querySelectorAll('div.debtor');
            const text = anchor.querySelector('.lot_info .lot_text');
            const image = anchor.querySelector('.lot_photo');
            const summ = anchor.querySelector('.start_price .sum');
            
            return {
                title: title,
                link: elem.href,
                debtor: debtor ? debtor.textContent : '',
                text: text ? text.textContent.trim() : '',
                image: image ? image.dataset.thumb : '/images/placeholder.svg',
                summ: summ ? summ.textContent.trim() : ''
            }
          });
        }, resultsSelector);
      
        // Data = links.join('\n');
        Data = links;
      
        // await browser.close();
    })

    return NextResponse.json(Data);

  }