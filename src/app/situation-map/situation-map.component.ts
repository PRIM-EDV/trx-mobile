import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-situation-map',
  templateUrl: './situation-map.component.html',
  styleUrls: ['./situation-map.component.scss'],
})
export class SituationMapComponent  implements OnInit, AfterViewInit {

  @ViewChild(MapComponent) map!: MapComponent;

  constructor() { }

  ngOnInit() {}

  async ngAfterViewInit() {
    console.log(this.map);
    try {
      setTimeout(() => {
        this.map.update();
      }, 1000);
      // this.map.onResourcesReady.subscribe(() => {
      //   console.log(this.map);
      // });
    } catch (error) {
      console.error('Error updating map', error);
    }
  }

}
