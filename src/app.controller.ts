import { Controller, Get, Post, Put, Body, Delete, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { IsNotEmpty, IsInt, IsOptional, IsString, IsNumberString} from 'class-validator';

export class PostRequestValidationDto {
 
  
  @IsNumberString()
  @IsNotEmpty()
  id : number;

  @IsNotEmpty()
  @IsString()
  firstName : string;

  @IsOptional()
  @IsString()
  lastName : string;
  
 }


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 @Get()
 async doGet(@Query('page') page: number = 0, @Query('limit') limit: number = 10) {
   return await this.appService.doGet(page, limit);
  }

 @Post()
 async doPost(@Body() postRequestValidationDto : PostRequestValidationDto) {
   console.log(`Request has reached Post ROUTE`);
   console.log(typeof(postRequestValidationDto.id));
   
   return this.appService.doPost(postRequestValidationDto);
 }

 @Put()
 async doPut(@Body() postRequestValidationDto : PostRequestValidationDto){
   console.log(`Req has reached Put ROUTE`);
   
   return this.appService.doPut(postRequestValidationDto);
 }

 @Delete()
 async doDelete(@Body() body){
   console.log(`Req has reached Delete ROUTE`);

   return this.appService.doDelete(body);
 }

}
