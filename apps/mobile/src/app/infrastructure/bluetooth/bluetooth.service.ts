import { computed, effect, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { BleClient, BleDevice, numberToUUID, ScanResult } from '@capacitor-community/bluetooth-le';
import { Subject } from 'rxjs';

const CUSTOM_SERVICE = numberToUUID(0xffe0);
const CUSTOM_CHARACTERISTIC = numberToUUID(0xffe1);

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  public isConnected: boolean = false;
  public isEnabled: WritableSignal<boolean> = signal(false);
  public isScanning: WritableSignal<boolean> = signal(false);
  public onConnect: Subject<any> = new Subject<any>();
  public onDisconnect: Subject<void> = new Subject<void>();
  public onData: Subject<string> = new Subject<string>();

  public availableDevices: Signal<BleDevice[]> = computed(() => {
    const allDevices = [
      ...this.bondedDevicesSource(),
      ...this.scannedDevicesSource()
    ];

    return allDevices
      .filter(device => device.deviceId !== this.connectedDeviceSource()?.deviceId)
      .filter((device, index, self) =>
        index === self.findIndex(d => d.deviceId === device.deviceId)
      );
  });

  public connectedDevice: Signal<BleDevice | null> = computed(() => {
    return this.connectedDeviceSource();
  });

  private bondedDevicesSource: WritableSignal<BleDevice[]> = signal([]);
  private connectedDeviceSource: WritableSignal<BleDevice | null> = signal(null);
  private scannedDevicesSource: WritableSignal<BleDevice[]> = signal([]);

  private storeConnectedDevice = effect(() => {
    const device = this.connectedDevice();
    if (device) {
      localStorage.setItem('ble.device', JSON.stringify(device));
    } else {
      localStorage.removeItem('ble.device');
    }
  });

  constructor() { 

    BleClient.initialize();
    
    BleClient.isEnabled().then(() => {
      this.isEnabled.set(true);
    }, () => {
      this.isEnabled.set(false);
    });

    this.autoconnectFromStore();
  }

  /**
   * Scans for available Bluetooth devices.
   */
  public scan(): void{
    if (this.isScanning()) {
      console.warn("Already scanning for devices.");
      return;
    }
    
    this.isScanning.set(true);
    this.scannedDevicesSource.set([]);

    // Start scanning for devices
    BleClient.requestLEScan(
      {services: [CUSTOM_SERVICE]},
      (result) => {
        this.scannedDevicesSource.update((devices) => {
          devices.push(result.device);
          return [...devices];
        });
      }
    ).then()
    .catch((error) => {
      this.isScanning.set(false);
      BleClient.stopLEScan();
      console.error("Error starting scan:", error);
    });

    // Stop scanning after 5 seconds
    setTimeout(() => {
      this.isScanning.set(false);
      BleClient.stopLEScan();
    }, 5000);
  }

  public async connect(device: BleDevice): Promise<void> {
    await BleClient.connect(device.deviceId, this.deviceDisconnectHandler.bind(this));
    await BleClient.startNotifications(device.deviceId, CUSTOM_SERVICE, CUSTOM_CHARACTERISTIC, (data: DataView) => {
      const s = new TextDecoder().decode(new Uint8Array(data.buffer));
      this.onData.next(s);
    });

    this.connectedDeviceSource.set(device);
    this.onConnect.next(device);
  }

  public disconnect() {
    const connectedDevice = this.connectedDevice();

    if (!connectedDevice) {
      console.warn("No device connected to disconnect.");
      return;
    }

    BleClient.stopNotifications(connectedDevice.deviceId, CUSTOM_SERVICE, CUSTOM_CHARACTERISTIC);
    BleClient.disconnect(connectedDevice.deviceId);
    this.connectedDeviceSource.set(null);
    this.onDisconnect.next();
  }

  public async enable() {
    try {
      await BleClient.enable();
      this.isEnabled.set(true);
    } catch (error) {
      console.error("Error enabling Bluetooth:", error);
    }
  }

  public async disable() {
    try {
      await BleClient.disable();
      this.isEnabled.set(false);
    } catch (error) {
      console.error("Error disabling Bluetooth:", error);
    }
  }

  private deviceDisconnectHandler(deviceId: string) {
    if (this.connectedDevice()?.deviceId === deviceId) {
      this.connectedDeviceSource.set(null);
      this.onDisconnect.next();
    }
  }

  private async autoconnectFromStore(): Promise<void> {
    const device = localStorage.getItem('ble.device');
    if (device) {
      await this.connect(JSON.parse(device));
    }
  }
}
