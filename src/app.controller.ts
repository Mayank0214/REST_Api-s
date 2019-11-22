import { Controller, Get, Post, Put, Body, Delete, Query } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 @Get()
 async doGet(@Query('page') page: number = 0, @Query('limit') limit: number = 10) {
   return await this.appService.doGet(page, limit);
  }

 @Post()
 async doPost(@Body() body) {
   console.log(`Request has reached Post ROUTE`);
   
   return this.appService.doPost(body);
 }

 @Put()
 async doPut(@Body() body){
   console.log(`Req has reached Put ROUTE`);
   
   return this.appService.doPut(body);
 }

 @Delete()
 async doDelete(@Body() body){
   console.log(`Req has reached Delete ROUTE`);

   return this.appService.doDelete(body);
 }

}
