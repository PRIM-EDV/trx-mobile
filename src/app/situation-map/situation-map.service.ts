import { Injectable, ViewChild } from '@angular/core';
import { BluetoothService, TrackerData } from '../backend/bluetooth.service';
import { MapComponent } from './map/map.component';

@Injectable({
  providedIn: 'root'
})
export class SituationMapService {

  @ViewChild(MapComponent) map!: MapComponent;

  constructor(private readonly backend: BluetoothService) {
    this.backend.onData.subscribe(this.handleData.bind(this));
  }

  private handleData(data: TrackerData) {

  }
}
