import { Component, signal, WritableSignal } from "@angular/core";
import { InformationBatteryComponent } from "./information-battery/information-battery.component";
import { InformationDeviceComponent } from "./information-device/information-device.component";

@Component({
  selector: "app-information",
  imports: [
    InformationBatteryComponent,
    InformationDeviceComponent
  ],
  templateUrl: "./information.component.html",
  styleUrls: ["./information.component.scss"],
})
export class InformationComponent {

    public battery: WritableSignal<number> = signal(0);

    constructor(
    ) {}
}
