import { Component } from '@angular/core';
import { PhSwitch } from '@phobos/elements';

@Component({
    selector: 'app-device',
    imports: [
        PhSwitch
    ],
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.scss']
})
export class DeviceComponent {
    constructor() {
        // Initialization logic here
    }
}