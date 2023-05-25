import { Injectable } from '@angular/core';
import { BLE } from '@awesome-cordova-plugins/ble/ngx';

export interface TrackerData {
  id: number;
  px: number;
  py: number;
  ts: number;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private readonly ble: BLE) { 
    this.ble.bondedDevices().then((devices) => {
      console.log(devices);
    });
  }

  private parseSerial(s: string): TrackerData {
    const data: any = s.split(':');

    const id = data[0];
    const flags = data[1] >> 4;
    const px = ((data[1] & 0x0f) << 6) | ((data[2] & 0xfc) >> 2);
    const py = ((data[2] & 0x03) << 8) | data[3];

    return {id: id, px: px, py: py, ts: Date.now()};
}
}
