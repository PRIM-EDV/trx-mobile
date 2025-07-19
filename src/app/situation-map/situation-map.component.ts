import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from './map/map.component';
import { MapEntityStatus } from 'proto/trx/trx.entity';
import { v4 } from 'uuid';
import { BluetoothService, TrackerData } from '../backend/bluetooth.service';
import { MapEntityData } from './map/common/map-entity-data';
import { MapEntityType } from './map/common/map-entity';

@Component({
    selector: 'app-situation-map',
    templateUrl: './situation-map.component.html',
    styleUrls: ['./situation-map.component.scss'],
    standalone: false
})
export class SituationMapComponent  implements OnInit, AfterViewInit {

  @ViewChild(MapComponent) map!: MapComponent;

  entities: Map<string, {data: MapEntityData, timestamp: number}> = new Map<string, {data: MapEntityData, timestamp: number}>();
  constructor(private readonly backend: BluetoothService) { 
    setInterval(this.cleanupEntities.bind(this), 10 * 1000);
  }

  ngOnInit() {}

  async ngAfterViewInit() {
    this.backend.onData.subscribe(this.handleData.bind(this));

    try {
      setTimeout(() => {
        this.map.update();
      }, 1000);
    } catch (error) {
      console.error('Error updating map', error);
    }
  }

  private handleData(data: TrackerData) {
    console.log(data)
    switch (true) {
      case data.id === 0: 
        this.updateMapEntity(data, MapEntityType.TYPE_UNDEFINED);
        break;
      case data.id < 128:
        this.updateMapEntity(data, MapEntityType.TYPE_FRIEND);
        break;
      case data.id < 192:
        this.updateMapEntity(data, MapEntityType.TYPE_FOE);
        break;
      case data.id < 256:
        this.updateMapEntity(data, MapEntityType.TYPE_OBJECT);
        break;
    }
  }

  private updateMapEntity(data: TrackerData, type: MapEntityType){
    const id = new Array<number>(16).fill(0).fill(1, data.id);
    const entity: MapEntityData = {
      id: v4({random: id}),
      type: type,
      size: 1,
      text: '',
      position: {x: data.px, y: data.py},
      status: MapEntityStatus.ENTITY_STATUS_REGULAR
    }
    console.log('Updating entity', entity);
    this.entities.set(entity.id, {data: entity, timestamp: Date.now()});
    this.map.createOrUpdateMapEntity(entity);

  }

  private cleanupEntities(){
    const now = Date.now();
    this.entities.forEach((value, key) => {
      if(now - value.timestamp > 3 * 60 * 1000){
        this.entities.delete(key);
        this.map.deleteMapEntity(key);
      }
    });
  }

}
