import { Component, signal, WritableSignal } from "@angular/core";
import { DeviceService } from "../device/device.service";
import { InformationBatteryComponent } from "./information-battery/information-battery.component";

@Component({
  selector: "app-information",
  imports: [InformationBatteryComponent],
  templateUrl: "./information.component.html",
  styleUrls: ["./information.component.scss"],
})
export class InformationComponent {

    public battery: WritableSignal<number> = signal(0);

    constructor(
        public device: DeviceService
    ) {}
}
