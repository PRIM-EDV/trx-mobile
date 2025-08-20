import { Component, Input } from "@angular/core";

@Component({
  selector: "app-information-battery",
  templateUrl: "./information-battery.component.html",
  styleUrls: ["./information-battery.component.scss"],
})
export class InformationBatteryComponent {
  @Input() battery: number = 0;
}
