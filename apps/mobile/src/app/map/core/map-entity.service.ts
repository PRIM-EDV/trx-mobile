import { Injectable, signal, WritableSignal } from "@angular/core";
import { Entity } from "@trx/map";

@Injectable({ providedIn: "root" })
export class MapEntityService {
  public entities: WritableSignal<Array<{entity: Entity, timestamp: number}>> = signal([]);

  constructor() {
    setInterval(() => this.cleanupEntities(), 10 * 1000);
  }

  public setEntity(entity: Entity) {
    const existing = this.entities().find((e) => e.entity.id === entity.id);
    if (existing) {
      this.updateEntity(existing.entity, entity);
    }
    else {
      this.entities.update((entities) => [...entities, { entity, timestamp: Date.now() }]);
    }
  }

  public setEntities(entities: Entity[]) {
    this.entities.set(entities.map((entity) => ({ entity, timestamp: Date.now() })));
  }

  public deleteEntity(deleted: Entity) {
    this.entities.update((entities) => {
      return entities.filter((entity) => entity.entity.id !== deleted.id);
    });
  }

  private updateEntity(existing: Entity, updated: Entity) {
    this.entities.update((entities) => {
      return entities.map((entity) => {
        if (entity.entity.id === existing.id) {
          return {entity: { ...entity.entity, ...updated }, timestamp: Date.now()};
        } else {
          return entity;
        }
      });
    });
  }

  private cleanupEntities() {
    const now = Date.now();
    this.entities.update((entities) => {
      return entities.filter((entity) => {
        return now - entity.timestamp < 5 * 60 * 1000;
      });
    });
  }
}
