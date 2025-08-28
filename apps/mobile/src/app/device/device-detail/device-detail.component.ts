import { Component, EventEmitter, Output } from '@angular/core';
import { PhSwitch } from '@phobos/elements';
import { TrackerService } from 'src/app/common/tracker/tracker.service';
import { BluetoothService } from 'src/app/infrastructure/bluetooth/bluetooth.service';


@Component({
    selector: 'app-device-detail',
    imports: [
        PhSwitch
    ],
    templateUrl: './device-detail.component.html',
    styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent {
    @Output() back = new EventEmitter<void>();

    constructor(
        public readonly bluetooth: BluetoothService,
        public readonly tracker: TrackerService
    ) { }
}