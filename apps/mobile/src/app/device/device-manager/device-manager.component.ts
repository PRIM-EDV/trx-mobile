import { Component, effect } from '@angular/core';
import { PhSwitch } from '@phobos/elements';
import { CommonModule } from '@angular/common';

import { BluetoothService } from 'src/app/infrastructure/bluetooth/bluetooth.service';

@Component({
    selector: 'app-device-manager',
    imports: [
        CommonModule,
        PhSwitch
    ],
    templateUrl: './device-manager.component.html',
    styleUrls: ['./device-manager.component.scss']
})
export class DeviceManagerComponent {

    public bluetoothEnabledState: boolean = false;

    bluetoothEnableChange = effect(() => {
        this.bluetoothEnabledState = this.bluetooth.isEnabled();
    });

    constructor(public readonly bluetooth: BluetoothService) {
        // Initialization logic here
    }

    scan() {
        this.bluetooth.scan();
    }

    changeBluetoothEnabledState() {
        if (this.bluetooth.isEnabled()) {
            this.bluetooth.disable();
        } else {
            this.bluetooth.enable();
        }
    }
}