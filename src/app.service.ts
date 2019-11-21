import { Injectable } from '@nestjs/common';
import fs = require('fs');
import { file } from '@babel/types';
const db = require("../file.json");

function readFile(filePath = "")  {
  return new Promise( ( resolve, reject ) => {
    fs.readFile('./file.json', ( err, data ) =>{
      console.log(`Readfile Ran ${data}`);
      if( err) reject( err );
      resolve(data);
      
  
    });
  })
}

@Injectable()
export class AppService {

  async doPost( params :any): Promise<any>{
    console.log("Request has reached Service==============");
    let postData = params, jsonData;
    jsonData = JSON.stringify([jsonData]);
    console.log(jsonData);
    fs.writeFile('file.json', jsonData, () => console.log(" Post Writefile Ran"));
    console.log( postData.id, postData.firstName, postData.lastName);
    // return `HI from POST req`;
    }

  async doGet(): Promise<any>{
    console.log(`Request has reached the Get Service`);
    let fileContent : any;
   

    return db;
    
   
  }

  async doPut(params: any): Promise<any>{
    
    let putdb = db;
    console.log(putdb);
    console.log(`Request has reached Put SERVICE==================`);
    let putData = params;
    console.log(`Updated DATA ${putData.id}`);
    if(parseInt(putData.id) === parseInt(db.id)){
      putdb.firstName = putData.firstName;
      putdb.lastName = putData.lastName;
    }else{
      console.log("ERROR ID DID NOT MATCH");
    }
    console.log(putdb);
    let jsonPutDb = JSON.stringify(putdb);
    fs.writeFile('./file.json', jsonPutDb, () => console.log(`Put Writefile Ran`));
   
  }

  async doDelete(params : any): Promise<any>{
    
    let putdb = db;
    console.log(putdb);
    console.log(`Request has reached Put SERVICE==================`);
    let putData = params;
    console.log(`Updated DATA ${putData.id}`);
    if(parseInt(putData.id) === parseInt(db.id)){
      let putdb = {};
      let jsonPutDb = JSON.stringify(putdb);
      fs.writeFile('./file.json', jsonPutDb, () => console.log(`Put Writefile Ran`));
    }else{
      console.log("ERROR ID DID NOT MATCH");
    }
  }

 }
