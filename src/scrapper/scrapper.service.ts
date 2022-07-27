import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScrapperService {
  async getDataViaPuppeteer() {
    const appointmentList = [];
    for (let i = 28; i <= 45; i++) {
      const url = `https://teleservices.paris.fr/rdvtitres/jsp/site/Portal.jsp?page=appointment&view=getViewAppointmentCalendar&id_form=${i}`;
      const browser = await puppeteer.launch({
        headless: false,
      });

      const page = await browser.newPage();
      await page.goto(url, {
        waitUntil: 'networkidle2',
      });

      const results = await page.evaluate((i) => {
        const townList = [];
        let obj = {};
        const els = document.getElementsByClassName('fc-title');
        let compteur = 0;
        Array.prototype.forEach.call(els, function (el) {
          if (el.innerHTML == '&nbsp;') {
            const date = new URL(
              'https://teleservices.paris.fr/rdvtitres/' +
                document
                  .getElementsByClassName(
                    'fc-day-grid-event fc-h-event fc-event fc-start fc-end',
                  )
                  [compteur].getAttribute('href'),
            ).searchParams.get('starting_date_time');
            let town;
            if (i == 28) {
              town = 1;
            } else if (i == 29) {
              town = 3;
            } else {
              town = i - 25;
            }
            obj = { town: town, date: date };
            townList.push(obj);
          }
          compteur += 1;
        });
        return townList;
      }, i);
      appointmentList.push(results);
      await browser.close();
    }
    console.log(appointmentList);
  }
}
