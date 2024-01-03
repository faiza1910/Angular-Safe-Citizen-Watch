import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class BaddieService {
  title = 'httpMod';
  i = new Date().getTime()
  baddie:any[]
  constructor(private http: HttpClient) {

    this.baddie = []
   }
   

   ngOnInit(): void {
  }

   get() {
    var listData;
    this.http.get("https://272.selfip.net/apps/aymbg3h9Bz/collections/baddie/documents/")
    .subscribe((data)=>{
      console.log(data);
      listData = data;
    })
    return listData;
   }

   add(name:string, location:string, reporterName:string, reporterNumber:number, picture:string, extra_info:string){
    console.log("post");
    
    const post_URL= "https://272.selfip.net/apps/aymbg3h9Bz/collections/baddie/documents/"
    this.http.post(post_URL,{
      "key": uuid.v4(),
     "data": {"name": name, 
      "location": location,
      "reporterName": reporterName,
      "reporterNumber": reporterNumber,
      "picture": picture,
      "extraInfo": extra_info,
      "status": true,
    "date":new Date().getTime().toString() }
      }).subscribe(
      (data:any)=>{
        console.log(data);
        
    })
   }
   modify(baddie: any){
    const mod_URL = `https://272.selfip.net/apps/aymbg3h9Bz/collections/baddie/documents/${baddie.key}`
      return this.http.put(mod_URL,{
        "key":baddie.key,
        "data": {"name": baddie.data.name, 
        "location": baddie.data.location,
        "reporterName": baddie.data.reporterName,
        "reporterNumber": baddie.data.reporterNumber,
        "picture" : baddie.data.picture,
        "extraInfo": baddie.data.extraInfo,
        "status": false,
      "date":baddie.data.date,}
      })
    

   }
   delete(key: any){
    const del_URL = `https://272.selfip.net/apps/aymbg3h9Bz/collections/baddie/documents/${key}`
    return this.http.delete(del_URL)
   }
    verifyPassword(password:string){
    const passURL= `https://api.hashify.net/hash/md5/hex?value=${password}`;
    const passHash =  this.http.get(passURL);
      return passHash;
    }
}
