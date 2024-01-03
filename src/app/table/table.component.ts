import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaddieService } from '../baddie.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent {
  title = 'httpMod';
  i = new Date().getTime()
  table= [ {data: {name: "", status: true, location: "", date: ""}, key: ""}]
  constructor(private bs: BaddieService, private http: HttpClient){}

  ngOnInit(): void {
    this.http.get("https://272.selfip.net/apps/aymbg3h9Bz/collections/baddie/documents/")
    .subscribe((data)=>{
      const jsonString = JSON.stringify(data);
      const newData = JSON.parse(jsonString);
      this.table = newData;
      console.log(this.table[0]);
    })
  }

  log(val:any) {
    console.log(val);
  }



}
