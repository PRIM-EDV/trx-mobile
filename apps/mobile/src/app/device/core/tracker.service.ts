import { Injectable, signal, WritableSignal } from "@angular/core";
import { Tracker } from "./models/tracker.model";

@Injectable({
  providedIn: "root",
})
export class TrackerService {

  public device: WritableSignal<Tracker | null> = signal(null);

  constructor() {}
}