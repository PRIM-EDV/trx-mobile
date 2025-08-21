import { Injectable } from "@angular/core";
import { Request } from "@trx/protocol";

import { TrackerGateway } from "../tracker.gateway";
import { TrackerService } from "../tracker.service";

@Injectable({
  providedIn: "root",
})
export class TrackerApiService {
  constructor(
    private gateway: TrackerGateway,
    private tracker: TrackerService
  ) {
    this.gateway.onRequest.subscribe(this.handleRequest.bind(this));
  }

private handleRequest({ id, request }: { id: string; request: Request }) {
    const entity = request.setEntity?.entity;

    if (entity?.id === 0) {
        const tracker = this.tracker.device();

        if (tracker) {
            tracker.position = entity.position!;
        }
    }
}
}