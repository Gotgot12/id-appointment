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
        b.push({
          town: a[i][k].town,
          date: a[i][k].date,
          linkAppointment: a[i][k].linkAppointment,
        });
      }
    }
    console.log(b);
    return { message: b };
  }
}
