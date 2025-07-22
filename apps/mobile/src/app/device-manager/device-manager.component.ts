import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BluetoothService } from '../infrastructure/bluetooth/bluetooth.service';
import { BleDevice } from '@capacitor-community/bluetooth-le';

@Component({
    selector: 'app-device-manager',
    templateUrl: './device-manager.component.html',
    styleUrls: ['./device-manager.component.scss'],
    standalone: false
})
export class DeviceManagerComponent  implements OnInit {

  public availableDevices: Array<BleDevice> = [];
  public isConnecting: boolean = false;

  constructor(public readonly bluetooth: BluetoothService, private cdr: ChangeDetectorRef) { }

  async ngOnInit() {
    // this.bluetooth.connectedDevice = {deviceId: '123', name: 'Test Device'};
  }

  public availableDevicesWithoutConnectedDevice() {
    return this.availableDevices.filter((device) => device.deviceId !== this.bluetooth.connectedDevice?.deviceId);
  }

  public async scan() {
    this.bluetooth.getAvailableDevices().subscribe({
      next: (scanResult) => {
        this.availableDevices.push(scanResult.device);
        console.log(scanResult);
        this.cdr.detectChanges();
      },
      complete: () => {
        console.log('Scan complete');
      }
    });
  }

  public toggleBluetooth() {  
    if (this.bluetooth.isEnabled) {
      this.bluetooth.disable();
    } else {
      this.bluetooth.enable();
    }
  } 

  public onBluetoothChange() {
    if (!this.bluetooth.isEnabled) {
      this.bluetooth.enable();
    }
  }

  public async connect(device: BleDevice) {
    this.isConnecting = true;
    await this.bluetooth.connect(device);
    this.cdr.detectChanges();
    this.isConnecting = false;
  }
}
