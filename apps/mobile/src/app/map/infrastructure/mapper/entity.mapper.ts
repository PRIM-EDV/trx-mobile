import { Entity, EntityState, EntityType } from "@trx/map";
import { Entity as entityDto, Type } from "@trx/protocol"


export function toEntity(entity: entityDto): Entity {
  const base = {
    id: entity.id.toString(),
    position: {
      x: entity.position!.x,
      y: entity.position!.y,
    },
    symbol: -1
  };

  switch (entity.type) {
    case Type.SQUAD:
      return {
        ...base,
        type: entity.id === 0 ? EntityType.SELF : EntityType.FRIEND,
        size: entity.size,
        text: "",
        state: EntityState.NORMAL,
      };
    case Type.ENEMY:
      return {
        ...base,
        type: EntityType.FOE,
        size: entity.size,
        text: "",
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