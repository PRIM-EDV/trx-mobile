import { Injectable } from '@angular/core';
import { BLE } from '@awesome-cordova-plugins/ble/ngx';
import { Subject } from 'rxjs';

export interface TrackerData {
  id: number;
  px: number;
  py: number;
  ts: number;
}

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  public connectedDevice: any = null;
  public isConnected: boolean = false;

  public onConnect: Subject<any> = new Subject<any>();
  public onDisconnect: Subject<void> = new Subject<void>();
  public onData: Subject<TrackerData> = new Subject<TrackerData>();

  constructor(private readonly ble: BLE) { 
    this.ble.bondedDevices().then((devices) => {
      console.log(devices);
    });
  }

  public async getAvailableDevices() {
    this.ble.scan([], 5).forEach((device: any) => console.log(device));
  }

  public async connect(address: string): Promise<any> {
    return new Promise((resolve, reject) => {
        console.log(address);
        this.ble.connect(address).subscribe({
          next: (device) => {
            this.connectedDevice = device;
            this.onConnect.next(device);
            // this.deviceConfig.updateConfig({device: d})
            this.ble.startNotification(address, 'ffe0', 'ffe1').subscribe(
              (data: ArrayBuffer) => {
                const s = new TextDecoder().decode(new Uint8Array(data));
                console.log(s);
                this.onData.next(this.parseSerial(s));
              }
            );
          },
          error: (err) => {
            if (this.connectedDevice != null) {
                this.onDisconnect.next();
                this.connectedDevice = null;
            }
          }
        });
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
