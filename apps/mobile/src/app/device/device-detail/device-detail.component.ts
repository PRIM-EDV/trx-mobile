import { Component } from '@angular/core';
import { PhSwitch } from '@phobos/elements';


@Component({
    selector: 'app-device-detail',
    imports: [
        PhSwitch
    ],
    templateUrl: './device-detail.component.html',
    styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent {

    public back() {
        // Logic to navigate back to the previous view
        console.log('Back button clicked');
    }
}