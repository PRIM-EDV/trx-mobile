import { Injectable } from '@angular/core';
import { BleClient, ScanResult } from '@capacitor-community/bluetooth-le';
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
  public isEnabled: boolean = false;

  public onConnect: Subject<any> = new Subject<any>();
  public onDisconnect: Subject<void> = new Subject<void>();
  public onData: Subject<TrackerData> = new Subject<TrackerData>();

  constructor() { 

    BleClient.initialize();
    
    BleClient.isEnabled().then(() => {
      this.isEnabled = true;
    }, () => {
      this.isEnabled = false;
    });

    BleClient.getConnectedDevices([]).then((devices) => {
      console.log(devices);
    });

    // this.ble.bondedDevices().then((devices) => {
    //   console.log(devices);
    // });
  }

  public async getAvailableDevices(): Promise<ScanResult[]> {
    return new Promise(async (resolve, reject) => {
      const devices: ScanResult [] = [];
      console.log('Scanning for devices');
      try {
        await BleClient.requestLEScan({
          services: []
        }, (device) => {
          console.log('Found device', device);
          devices.push(device);
        })
        console.log('???');
        setTimeout(async () => {
          console.log('Stopping scan');
          await BleClient.stopLEScan();
          resolve(devices);
        }, 30000);
      } catch (error) {
        console.error(error);
        reject(error);
      } 

    });
  }

  public async connect(address: string): Promise<any> {
    return new Promise((resolve, reject) => {
        // BleClient.connect(address).subscribe({
        //   next: (device) => {
        //     this.connectedDevice = device;
        //     this.onConnect.next(device);
        //     // this.deviceConfig.updateConfig({device: d})
        //     this.ble.startNotification(address, 'ffe0', 'ffe1').subscribe(
        //       (data: ArrayBuffer) => {
        //         const s = new TextDecoder().decode(new Uint8Array(data));
        //         console.log(s);
        //         this.onData.next(this.parseSerial(s));
        //       }
        //     );
        //   },
        //   error: (err) => {
        //     if (this.connectedDevice != null) {
        //         this.onDisconnect.next();
        //         this.connectedDevice = null;
        //     }
        //   }
        // });
    });
  }

  public async enable() {
    await BleClient.enable();
    this.isEnabled = true;
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
