import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  private map!: L.Map
  existingLocation: string[] = ['STanley Park', 'SFU Burnaby']
  selectedLocation: string= ""
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.showMap()
    this.putLabels()
    this.showClick()

  }
  
  addLocation(newLocation: string){
    if(!this.existingLocation.includes(newLocation)){
      this.existingLocation.push(newLocation)
      this.putLabels()
    }
  }
  showMap() {
    this.map = L.map('map').setView([49.27, -123], 11);

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',

    }).addTo(this.map);
  }

  putLabels() {
    L.marker([49.2276, -123.0076]).addTo(this.map)
  		.bindPopup("")
    L.marker([49.300054, -123.148155]).addTo(this.map)
    	.bindPopup("<b>Stanley Park</b><br />5 nuisance reports")
    L.marker([49.2781, -122.9199]).addTo(this.map)
    	.bindPopup("<b>SFU Burnaby</b><br />2 nuisance reports")
    // this.map.eachLayer((layer) => {
    //   if (layer instanceof L.Marker) {
    //     this.map.removeLayer(layer);
    //   }
    // });
    // const locURL= "https://272.selfip.net/apps/aymbg3h9Bz/collections/baddie/documents/username/"
    // this.http.get(locURL).subscribe(
    //   (data: any)=>{
    //     console.log(data)
    //     const locationset = new Set<string>()
    //     data.forEach((report: any)=>{
    //       locationset.add(report.location)
    //       const latLng= this.getLocationLatLng(report.location)
    //       const count = data.filter((r: any) => r.location === report.location).length
    //       const marker = L.marker(latLng).addTo(this.map);
    //       marker.bindPopup(`<b>${report.location}</b><br />${count} nuisance reports`);
    //     })
    //   },
    // )
  }
  // getLocationLatLng(location: string): [number, number]{
  //   switch (location){
  //     case 'Stanley Park':
  //     return [49.300054, -123.148155];
  //   case 'SFU Burnaby':
  //     return [49.2781, -122.9199];
  //   default:
  //     return [0, 0];
  //   }
  // }
  showClick(){
    // this.map.on('click', (e)=>{
    //   const clickedMarkers = (e as any).layer.feature.properties
    //   if (clickedMarkers.length > 0) {
    //     const clickedLocation = clickedMarkers[0].properties.name;
    //     window.alert(`You clicked on ${clickedLocation}`);
    //   }
    // });
    this.map.on('click', (e)=>{
      alert("Lat, Lon: "+e.latlng.lat+ ","+ e.latlng.lng)
    });
  }

}
