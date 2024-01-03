import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BaddieService } from '../baddie.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-baddie-view',
  templateUrl: './baddie-view.component.html',
  styleUrls: ['./baddie-view.component.css']
})
export class BaddieViewComponent implements OnInit{
  key: string;
  baddie: any;
  constructor(private route: ActivatedRoute,private router: Router,private http: HttpClient,private bs: BaddieService) {
    this.key=""
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.key = params['key'];
      this.loadBaddieDetails();
    });
  }
  loadBaddieDetails() {
    const detailUrl = `https://272.selfip.net/apps/aymbg3h9Bz/collections/baddie/documents/${this.key}`;
    this.http.get(detailUrl).subscribe((data) => {
      this.baddie = data;
  
    });
  }
  goBack() {
    this.router.navigate(['/']);
    console.log('Going back')
    
  }
  changeStatus(key: any){
    const password = window.prompt('Enter password') || "";
    this.bs.verifyPassword(password).subscribe(data => {
      console.log(data);
      const jsonString = JSON.stringify(data);
      const newData = JSON.parse(jsonString);
      if(password &&  (newData.Digest === "fcab0453879a2b2281bc5073e3f5fe54")){
        if (this.baddie && this.baddie.data) {
          this.bs.modify(this.baddie)
          .subscribe(data => {
            console.log(data);
            this.loadBaddieDetails();
          })
          // this.baddie.data.status = !this.baddie.data.status;
      }
    }
    else{
      alert('Wrong Password! Try Again!')
    }
    })

  }
  getStatus(){
    return this.baddie?.data?.status ? 'Open' : 'Resolved';
  }

}
