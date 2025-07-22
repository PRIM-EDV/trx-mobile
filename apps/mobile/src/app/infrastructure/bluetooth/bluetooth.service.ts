import { Injectable } from '@angular/core';
import { BleClient, BleDevice, numberToUUID, ScanResult } from '@capacitor-community/bluetooth-le';
import { Observable, Subject } from 'rxjs';

// export interface TrackerData {
//   id: number;
//   px: number;
//   py: number;
//   ts: number;
// }

const CUSTOM_SERVICE = numberToUUID(0xffe0);
const CUSTOM_CHARACTERISTIC = numberToUUID(0xffe1);

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  public connectedDevice: any = null;
  public isConnected: boolean = false;
  public isEnabled: boolean = false;
  public isScanning: boolean = false;

  public onConnect: Subject<any> = new Subject<any>();
  public onDisconnect: Subject<void> = new Subject<void>();
  // public onData: Subject<TrackerData> = new Subject<TrackerData>();
  public onData: Subject<string> = new Subject<string>();

  constructor() { 

    BleClient.initialize();
    
    BleClient.isEnabled().then(() => {
      this.isEnabled = true;
    }, () => {
      this.isEnabled = false;
    });

    this.autoconnectFromStore();
  }

  public getAvailableDevices(): Observable<ScanResult> {
    BleClient.stopLEScan();

    if (this.isScanning) {
      return new Observable((observer) => {
        observer.error("Scanning already in progress");
      });
    }

    return new Observable((observer) => {
      BleClient.requestLEScan({
        services: [
          CUSTOM_SERVICE
        ]
      }, (device) => {
        observer.next(device);
      });
      this.isScanning = true;

      window.setTimeout(async () => {
        this.isScanning = false;
        observer.complete();
        await BleClient.stopLEScan();
      }, 5000);
    });
  }

  public async connect(device: BleDevice): Promise<void> {
    await BleClient.connect(device.deviceId, this.deviceDisconnectHandler.bind(this));
    await BleClient.startNotifications(device.deviceId, CUSTOM_SERVICE, CUSTOM_CHARACTERISTIC, (data: DataView) => {
      const s = new TextDecoder().decode(new Uint8Array(data.buffer));
      this.onData.next(s);
    });

    this.connectedDevice = device;
    this.onConnect.next(device);

    this.storeConnectedDevice(device);
  }

  public disconnect() {
    BleClient.stopNotifications(this.connectedDevice.deviceId, CUSTOM_SERVICE, CUSTOM_CHARACTERISTIC);
    BleClient.disconnect(this.connectedDevice.deviceId);
    this.connectedDevice = null;
    this.onDisconnect.next();
  }

  public async enable() {
    await BleClient.enable();
    this.isEnabled = true;
  }

  public async disable() {
    await BleClient.disable();
    this.isEnabled = false;
  }

  // private parseSerial(s: string): TrackerData {
  //   const data: any = s.split(':');

  //   const id = parseInt(data[0]);
  //   const flags = data[1] >> 4;
  //   const px = ((data[1] & 0x0f) << 6) | ((data[2] & 0xfc) >> 2);
  //   const py = ((data[2] & 0x03) << 8) | data[3];
  //   return {id: id, px: px, py: py, ts: Date.now()};
  // }

  private deviceDisconnectHandler(deviceId: string) {
    if (this.connectedDevice?.deviceId === deviceId) {
      this.connectedDevice = null;
      this.onDisconnect.next();
    }
  }

  private storeConnectedDevice(device: BleDevice) {
    localStorage.setItem('connectedDevice', JSON.stringify(device));
  }

  private async autoconnectFromStore(): Promise<void> {
    const device = localStorage.getItem('connectedDevice');
    if (device) {
      await this.connect(JSON.parse(device));
    }
  }
}
