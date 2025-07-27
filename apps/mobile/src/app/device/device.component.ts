import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BluetoothService } from '../infrastructure/bluetooth/bluetooth.service';
import { DeviceManagerComponent } from "./device-manager/device-manager.component";
import { DeviceDetailComponent } from "./device-detail/device-detail.component";

@Component({
    selector: 'app-device',
    imports: [
    CommonModule,
    DeviceManagerComponent,
    DeviceDetailComponent
],
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.scss']
})
export class DeviceComponent {

    public showDetails: boolean = false;


    constructor(public readonly bluetooth: BluetoothService) {
    }
}