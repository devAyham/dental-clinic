import { Controller, Get ,Post,Res,Body} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController{
  private redirectUrl: string = 'https://amjad.cloud'; 

  constructor(private appService :AppService ){}

  @Post('set-url')
  setUrl(@Body('url') url: string) {
    this.redirectUrl=url;
    return { message: 'URL updated successfully', url };
  }

  @Get("redirect-to-app")
  redirect(@Res() res: Response) {
    const url = this.redirectUrl;
    return res.redirect(url);
  }
  @Get('/')
  serveHtml(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..',  '..','public', 'index.html'));
  }


    @Get('/testPrisma')
    testPrisma(): any {
      return this.appService.storeDiseaseForTest();
    }
    
}