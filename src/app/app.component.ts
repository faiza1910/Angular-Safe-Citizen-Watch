import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
const iconRetinaUrl = "assets/marker-icon-2x.png";
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon ({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize:[25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon= iconDefault;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private map: L.Map | undefined; 
  constructor(){ }
  ngAfterViewInit(): void{
    this.map =L.map('map').setView([49.2, -123], 11);
  }
}
