import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BaddieViewComponent } from './baddie-view/baddie-view.component';
import { AddFormComponent } from './add-form/add-form.component';

const appRoutes: Routes =[
  { path: '', component: AddFormComponent },
  { path: 'baddie/:key', component: BaddieViewComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
