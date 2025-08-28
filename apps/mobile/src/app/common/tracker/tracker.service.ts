import { Injectable, signal, WritableSignal } from "@angular/core";
import { Tracker } from "./models/tracker.model";
import { BluetoothService } from "src/app/infrastructure/bluetooth/bluetooth.service";
import { TrackerGateway } from "./tracker.gateway";
import { TrackerRpcAdapter } from "./rpc/tracker.rpc.adapter";

@Injectable({
  providedIn: "root",
})
export class TrackerService {

  public device: WritableSignal<Tracker | null> = signal(null);

  constructor(
    private gateway: TrackerGateway,
    private bluetooth: BluetoothService,
    private rpc: TrackerRpcAdapter
  ) {
    this.bluetooth.onConnect.subscribe(this.onConnectHandler.bind(this));

    setInterval(() => {
      if (this.bluetooth.isConnected && this.device()) {
        this.updateBattery();
      }
    }, 10000);
  }

  private async onConnectHandler() {
    const deviceInfo = await this.rpc.getDeviceInfo();
    const batteryStatus = await this.rpc.getBatteryStatus();

    this.device.set({
      id: deviceInfo.deviceId,
      version: deviceInfo.fwVersion,
      battery: {
        level: batteryStatus.batteryLevel,
        charging: batteryStatus.isCharging
      },
      position: {
        x: 0,
        y: 0
      }
    });
  }

  private async updateBattery() {
    const batteryStatus = await this.rpc.getBatteryStatus();
    this.device.update((prev) => ({
      id: prev?.id ?? "",
      version: prev!.version ?? "",
      position: prev?.position ?? { x: 0, y: 0 },
      battery: {
        level: batteryStatus.batteryLevel,
        charging: batteryStatus.isCharging
      }
    }));
  }

}