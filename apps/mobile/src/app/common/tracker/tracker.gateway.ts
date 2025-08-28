import { Injectable } from "@angular/core";
import { Request, Response, TrxMessage } from "@trx/protocol";
import { Subject, Subscription } from "rxjs";
import { v4 as uuidv4 } from 'uuid';
import { BluetoothService } from "src/app/infrastructure/bluetooth/bluetooth.service";

import * as cobs from 'cobs';

@Injectable({
  providedIn: "root",
})
export class TrackerGateway {

  public onRequest: Subject<{ id: string, request: Request }> = new Subject<{ id: string, request: Request }>();
  public onMessage: Subject<TrxMessage> = new Subject<TrxMessage>();
  public onOpen: Subject<void> = new Subject<void>();
  public onClose: Subject<void> = new Subject<void>();

  private onDataSubscription: Subscription | null = null;
  private requests: Map<string, (value: Response) => void> = new Map<string, (value: Response) => void>();

  constructor(
    private bluetooth: BluetoothService
  ) {
    this.bluetooth.onConnect.subscribe(() => {
      this.onDataSubscription = this.bluetooth.onData.subscribe(this.handleMessage.bind(this));
    });

    this.bluetooth.onDisconnect.subscribe(() => {
      this.onDataSubscription?.unsubscribe();
    });
  }

  public async request(req: Request): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      const msg: TrxMessage = {
        id: uuidv4(),
        request: req
      }
      this.requests.set(msg.id, resolve.bind(this));
      setTimeout(this.rejectOnTimeout.bind(this, msg.id, reject.bind(this, `${req} timed out`)), 5000);
      await this.bluetooth.sendData(cobs.encode(TrxMessage.encode(msg).finish()));
    });

  }

  public async respond(id: string, res: Response) {
    const msg: TrxMessage = {
      id: id,
      response: res
    }

    await this.bluetooth.sendData(cobs.encode(TrxMessage.encode(msg).finish()));
  }

  private handleMessage(data: Uint8Array) {
    const msg = TrxMessage.decode(cobs.decode(data));
    console.log('TrxGateway: Received message', msg);

    if (msg.request) {
      this.onRequest.next({ id: msg.id, request: msg.request });
    }

    if (msg.response) {
      if (this.requests.has(msg.id)) {
        this.requests.get(msg.id)!(msg.response);
        this.requests.delete(msg.id);
      }
    }

    this.onMessage.next(msg);
  }

  private rejectOnTimeout(id: string, reject: (reason?: any) => void) {
    if (this.requests.delete(id)) {
      reject();
    };
  }
}