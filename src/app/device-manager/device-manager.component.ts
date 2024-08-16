import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BluetoothService } from '../backend/bluetooth.service';

@Component({
  selector: 'app-device-manager',
  templateUrl: './device-manager.component.html',
  styleUrls: ['./device-manager.component.scss'],
})
export class DeviceManagerComponent  implements OnInit {

  public availableDevices: Array<{name: string, id: string}> = [];

  constructor(public readonly bluetooth: BluetoothService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.availableDevices = [];

    this.bluetooth.getAvailableDevices().forEach((device) => {
      if (device.name) {
        this.availableDevices.push({name: device.name, id: device.id});
        this.cdr.detectChanges();
      }
    });
  }


  public onBluetoothChange() {
    if (!this.bluetooth.isEnabled) {
      this.bluetooth.enable();
    }
  }

  public async connect(id: string) {
    await this.bluetooth.connect(id);
    this.cdr.detectChanges();
  }
}
