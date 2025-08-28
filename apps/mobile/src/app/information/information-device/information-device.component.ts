import { Component, Input } from "@angular/core";
import { Tracker } from "src/app/common/tracker/models/tracker.model";

@Component({
    selector: "app-information-device",
    templateUrl: "./information-device.component.html",
    styleUrls: ["./information-device.component.scss"]
})
export class InformationDeviceComponent {
    @Input() device: Tracker | null = null;
}