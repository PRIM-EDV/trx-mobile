import { Component, computed, Signal } from '@angular/core';
import { Entity, EntityClickEvent, MapClickEvent, TrxMap } from '@trx/map';
import { MapEntityService } from './core/map-entity.service';

@Component({
  selector: 'app-map',
  imports: [

  ],
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  public entities: Signal<Entity[]> = computed(() => {
    // return this.entity.entities().map((e) => toEntity(e));
  }); 

  constructor(
    // public readonly  entity: MapEntityService,
    // private readonly contextMenu: ContextMenuService,
    // private readonly dialog: DialogService,
    // private readonly facade: EntityFacadeService,
  ) { }

  public handleEntityMoved(entity: Entity) {
    console.log('Entity moved:', entity);
  }
}
