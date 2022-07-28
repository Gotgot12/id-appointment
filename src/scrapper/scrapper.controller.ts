import { Controller, Get, Render } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';

@Controller('scrapper')
export class ScrapperController {
  constructor(private scrapperService: ScrapperService) {}

  @Get()
  @Render('index')
  async scrapperController(): Promise<object> {
    const a = await this.scrapperService.getDataViaPuppeteer();
    const b = [];
    for (let i = 0; i < Object.keys(a).length; i++) {
      for (let k = 0; k < a[i].length; k++) {
        const dayAndHour = a[i][k].date.split('T');
        let day = dayAndHour[0].split('-');
        day = day[2] + '/' + day[1] + '/' + day[0];
        b.push({
          town: a[i][k].town,
          day: day,
          hour: dayAndHour[1],
          linkAppointment: a[i][k].linkAppointment,
        });
      }
    }
    console.log(b);
    return { message: b };
  }
}
