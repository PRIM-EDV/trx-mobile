import { Component, OnInit } from '@angular/core';
import { BluetoothService } from '../backend/bluetooth.service';

@Component({
  selector: 'app-device-manager',
  templateUrl: './device-manager.component.html',
  styleUrls: ['./device-manager.component.scss'],
})
export class DeviceManagerComponent  implements OnInit {

  constructor(private readonly bluetooth: BluetoothService) { }

  ngOnInit() {
    this.bluetooth.getAvailableDevices();
  }

}
