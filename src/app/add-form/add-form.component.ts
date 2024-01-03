import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaddieService } from '../baddie.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MapComponent } from '../map/map.component';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent {
  @ViewChild(MapComponent, { static: true }) mapComponent!: MapComponent;
  table= [ {data: {name: "", status: true, location: "", date: ""}, key: ""}]
  existingLocation: string[] = ['Stanley Park', 'SFU Burnaby'];
  curSortCol: "name" | "location" | "date" = "name"
  isVisible:boolean = false
  form: FormGroup
  constructor(private bs: BaddieService, private http: HttpClient, private router: Router){
    let formControls = {
      name: new FormControl('',[
        Validators.required
      ]),
      location: new FormControl('',[
        Validators.required
      ]),
      extra_info: new FormControl(),
      picture: new FormControl(),
      reporterName: new FormControl(),
      reporterNumber: new FormControl()
    }
    this.form = new FormGroup(formControls)
  }
  ngOnInit(): void {
    this.reloadTable();
  }

  reloadTable () {
    this.http.get("https://272.selfip.net/apps/aymbg3h9Bz/collections/baddie/documents/")
    .subscribe((data)=>{
      const jsonString = JSON.stringify(data);
      const newData = JSON.parse(jsonString);
      this.table = newData;
      this.sortTable();
      
    })
  }

  sortTable(){
    this.table.sort((a,b)=>{
      const aVal= a.data[this.curSortCol]
      const bVal= b.data[this.curSortCol]

      if(aVal<bVal){
        return -1
      }else if(aVal>bVal){
        return 1
      }
      else{
        return 0
      }
    })
  }
  sortBy(column: "name" | "location" | "date"){
    this.curSortCol=column
    this.sortTable()
  }
  toggleVisibility(){
    this.isVisible=!this.isVisible
  }
  onSubmit() {
    const post_URL= "https://272.selfip.net/apps/aymbg3h9Bz/collections/baddie/documents/"
    this.http.post(post_URL,{
      "key": uuid.v4(),
     "data": {"name": this.form.value.name, 
      "location": this.form.value.location,
      "reporterName": this.form.value.reporterName,
      "reporterNumber": this.form.value.reporterNumber,
      "picture": this.form.value.picture,
      "extraInfo": this.form.value.extra_info,
      "status": true,
    "date":new Date().getTime().toString() }
      }).subscribe(
      (data:any)=>{
        
      this.form.reset();
      this.reloadTable(); 
    })
  }
  showMoreInfo(key: string){
    this.router.navigate(['/baddie/'+key])
  }
  deleteItem(key: any){
    const password = window.prompt('Enter password') || "";
    this.bs.verifyPassword(password).subscribe(data => {
      console.log(data);
      const jsonString = JSON.stringify(data);
      const newData = JSON.parse(jsonString);
      if(password &&  (newData.Digest === "fcab0453879a2b2281bc5073e3f5fe54")){
      this.bs.delete(key).subscribe(
        data => {
          this.reloadTable();
      });
    }else{
      alert('Wrong Password! Try again!')
    }
  
  })

  }

}
