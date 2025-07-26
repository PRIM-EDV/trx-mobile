import { Component, effect } from '@angular/core';
import { PhSwitch } from '@phobos/elements';
import { BluetoothService } from '../infrastructure/bluetooth/bluetooth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-device',
    imports: [
        CommonModule,
        PhSwitch
    ],
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.scss']
})
export class DeviceComponent {

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