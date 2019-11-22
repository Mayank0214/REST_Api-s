import { Injectable } from '@nestjs/common';
import fs = require('fs');
import { file } from '@babel/types';
;

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
   
    let postData = params, jsonData;
    
    const fileData = await readFile();

    
    const filter = db.filter( ( e ) =>  e.id === params.id);
    if( filter.length > 0 ) {
      return "Record Already exists";
    }
    db.push( params )
    jsonData = JSON.stringify( db );
    fs.writeFile('file.json', jsonData, () => console.log(" Post Writefile Ran"));
   
    }

  async doGet(page, limit): Promise<any>{
     if(page === 1){
       page = 0;
     }
     return db.slice(page, limit);

    }


  async doPut(params: any): Promise<any>{
    
    let index;
    db.forEach( ( e, i) => {

      if( e.id === params.id) {
        index = i;
      }
    });

    if( !index ) {
      return "No such record found";
    }
    const oldRecord = db[index];
    for ( let key in params ){
      if( key === "id" ) {
        continue;
      }else {
         if ( oldRecord[key]){
           oldRecord[key] = params[key];
           
         }
        
      }
      
    }

    db[index] = oldRecord;
    fs.writeFile('./file.json', JSON.stringify(db), () => console.log(`Put Writefile Ran`));
    return false;
  }

  async doDelete(params : any): Promise<any>{
    
    let index;
    db.forEach( ( e, i) => {

      if( e.id === params.id) {
        index = i;
      }
    });

    if( !index ) {
      return "No such record found";
    }
    
    db.splice( index, 1);
    console.log(db);
    fs.writeFile('./file.json', JSON.stringify(db), () => console.log(`Put Writefile Ran`));
    return false;
  }

 }
