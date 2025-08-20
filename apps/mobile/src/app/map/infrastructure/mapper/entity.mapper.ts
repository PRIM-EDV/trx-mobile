import { Entity, EntityState, EntityType } from "@trx/map";
import { MapEntity, MapEntityStatus, MapEntityType } from "@phobos-maptool/models";

export function toEntity(entity: MapEntity): Entity {
  const base = {
    id: entity.id,
    position: {
      x: entity.position.x,
      y: entity.position.y,
    },
    symbol: -1
  };

  switch (entity.type) {
    case MapEntityType.FOE:
      return {
        ...base,
        type: EntityType.FOE,
        size: entity.entity.combattants,
        text: "",
        state: EntityState.NORMAL,
      };
    case MapEntityType.FRIEND:
      return {
        ...base,
        type: EntityType.FRIEND,
        size: entity.entity.combattants,
        text: entity.entity.callsign,
        state: entity.entity.status == MapEntityStatus.COMBAT ? EntityState.BATTLE : EntityState.NORMAL,      
      };
    case MapEntityType.OBJECT:
      return {
        ...base,
        type: EntityType.OBJECT,
        size: 0,
        text: entity.entity.name,
        state: EntityState.NORMAL,
      };
    default:
      return {
        ...base,
        type: EntityType.UNDEFINED,
        size: 0,
        text: "",
        state: EntityState.NORMAL,
      };
  }
}