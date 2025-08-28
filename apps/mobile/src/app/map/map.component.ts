import { Component, computed, Signal } from '@angular/core';
import { Entity, TrxMap } from '@trx/map';

import { MapEntityService } from './core/map-entity.service';
import { toEntity } from './infrastructure/mapper/entity.mapper';
import { MapApiService } from './api/map.api.service';

@Component({
  selector: 'app-map',
  imports: [
    TrxMap
  ],
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  public entities: Signal<Entity[]> = computed(() => {
    return []
    // return this.entity.entities().map((e) => toEntity(e));
  }); 

  constructor(
    public readonly  entity: MapEntityService,
    private readonly api: MapApiService
  ) { }
}
