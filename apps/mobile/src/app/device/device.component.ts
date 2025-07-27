import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BluetoothService } from '../infrastructure/bluetooth/bluetooth.service';
import { DeviceManagerComponent } from "./device-manager/device-manager.component";

@Component({
    selector: 'app-device',
    imports: [
    CommonModule,
    DeviceManagerComponent
],
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.scss']
})
export class DeviceComponent {



    constructor(public readonly bluetooth: BluetoothService) {
        // Initialization logic here
    }
}