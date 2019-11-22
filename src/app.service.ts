import { Injectable } from '@nestjs/common';
import fs = require('fs');
import { file } from '@babel/types';
;

const db = require("../file.json");

// PROMISIFY
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
  
    let jsonData;
  
    // FILTERING OUT EXISTING RECORDS
    const filter = db.filter( ( e ) =>  e.id === params.id);
    if( filter.length > 0 ) {
      return "Record Already exists";
    }

    db.push( params )

    // CONVERT THE DATA INTO JSON FORMATE TO WRITE IT INTO A FILE
    jsonData = JSON.stringify( db );
    fs.writeFile('file.json', jsonData, () => console.log(" Post Writefile Ran"));
    
    return params;
    }

  async doGet(page, limit): Promise<any>{
     if(page === 1){
       page = 0;
     }
     return db.slice(page, limit);

    }


  async doPut(params: any): Promise<any>{
    
    let index;

    // CHECKING IF ID MATCH EXISTS
    db.forEach( ( e, i) => {

      if( e.id === params.id) {
        index = i;
      }
    });

    if( !index ) {
      return "No such record found";
    }

    // UPDATING ALL EXCEPT ID 
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

    // WRITING THE UPDATED OLD RECORD TO THE JSON FILE
    db[index] = oldRecord;
    fs.writeFile('./file.json', JSON.stringify(db), () => console.log(`Put Writefile Ran`));
    return db[index];
  }

  async doDelete(params : any): Promise<any>{
    
    let index;

     // CHECKING IF ID MATCH EXISTS
    db.forEach( ( e, i) => {

      if( e.id === params.id) {
        index = i;
      }
    });

    if( !index ) {
      return "No such record found";
    }
    
    // DELETING THE RECORD FROM THE ARRAY AT MATCH ID(ARRAY INDEX)
    db.splice( index, 1);
    console.log(db);
    fs.writeFile('./file.json', JSON.stringify(db), () => console.log(`Delete Writefile Ran`));
    return `RECORD WITH ID ${params.id} HAS BEEN REMOVED`;
  }

 }
