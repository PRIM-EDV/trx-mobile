import { Injectable } from "@angular/core";
import { Request, SetEntity_Request, SetEntity_Response } from "@trx/protocol";
import { MapEntityService } from "../core/map-entity.service";
import { TrackerGateway } from "src/app/common/tracker/tracker.gateway";
import { MapEntity } from "@phobos-maptool/models";
import { toEntity } from "../infrastructure/mapper/entity.mapper";

@Injectable({
  providedIn: "root",
})
export class MapApiService {
  constructor(
    private gateway: TrackerGateway,
    private entity: MapEntityService
  ) {
    this.gateway.onRequest.subscribe(this.handleRequest.bind(this));
  }

  private async setMapEntity(request: SetEntity_Request): Promise<SetEntity_Response> {
    const entityDto = request.entity!;

    this.entity.setEntity(toEntity(entityDto));
    return {};
  }

  private async handleRequest(e: { id: string, request: Request }) {
    const method = Object.keys(e.request).find(key => (e.request as any)[key] !== undefined);

    if (method) {
      const args = (e.request as any)[method] as any
      if (typeof (this as any)[method] === 'function') {
        const res = await (this as any)[method](args);
      }
    }
  }
}