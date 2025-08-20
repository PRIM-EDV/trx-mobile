import { Injectable } from "@angular/core";
import { TrackerGateway } from "../tracker.gateway";
import { GetBatteryStatus_Response, GetDeviceInfo_Response, Request } from "@trx/protocol";

@Injectable({
  providedIn: "root",
})
export class TrackerRpcAdapter {
    constructor(private readonly gateway: TrackerGateway) {

    }

    public async getBatteryStatus(): Promise<GetBatteryStatus_Response> {
        const request: Request = { 
            getBatteryStatus: {}
        };
        const response = await this.gateway.request(request) as GetBatteryStatus_Response;

        return response;
    }

    public async getDeviceInfo(): Promise<GetDeviceInfo_Response> {
        const request: Request = { 
            getDeviceInfo: {}
        };
        const response = await this.gateway.request(request) as GetDeviceInfo_Response;

        return response;
    }
}