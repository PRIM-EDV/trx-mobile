import { Injectable, signal, WritableSignal } from "@angular/core";
import { MapEntity } from "@phobos-maptool/models";

@Injectable({ providedIn: "root" })
export class MapEntityService {
  public entities: WritableSignal<MapEntity[]> = signal<MapEntity[]>([]);

  public setEntity(entity: MapEntity) {
    const existing = this.entities().find((e) => e.id === entity.id);
    if (existing) {
      this.updateEntity(existing, entity);
    }
    else {
      this.entities.update((entities) => [...entities, entity]);
    }
  }

  public setEntities(entities: MapEntity[]) {
    this.entities.set(entities);
  }

  public deleteEntity(deleted: MapEntity) {
    this.entities.update((entities) => {
      return entities.filter((entity) => entity.id !== deleted.id);
    });
  }

  private updateEntity(existing: MapEntity, updated: MapEntity) {
    this.entities.update((entities) => {
      return entities.map((entity) => {
        if (entity.id === existing.id) {
          return { ...entity, ...updated };
        } else {
          return entity;
        }
      });
    });
  }
}
