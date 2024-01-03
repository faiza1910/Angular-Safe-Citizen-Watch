import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { AddFormComponent } from './add-form/add-form.component';
import { TableComponent } from './table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { BaddieViewComponent } from './baddie-view/baddie-view.component';




@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AddFormComponent,
    TableComponent,
    BaddieViewComponent,
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule, 
    RoutingModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
