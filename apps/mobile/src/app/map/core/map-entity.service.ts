import { Injectable, signal, WritableSignal } from "@angular/core";
import { Entity } from "@trx/map";

@Injectable({ providedIn: "root" })
export class MapEntityService {
  public entities: WritableSignal<Entity[]> = signal<Entity[]>([]);

  public setEntity(entity: Entity) {
    const existing = this.entities().find((e) => e.id === entity.id);
    if (existing) {
      this.updateEntity(existing, entity);
    }
    else {
      this.entities.update((entities) => [...entities, entity]);
    }
  }

  public setEntities(entities: Entity[]) {
    this.entities.set(entities);
  }

  public deleteEntity(deleted: Entity) {
    this.entities.update((entities) => {
      return entities.filter((entity) => entity.id !== deleted.id);
    });
  }

  private updateEntity(existing: Entity, updated: Entity) {
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
