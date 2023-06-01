import { Injectable } from '@angular/core';
import { BluetoothService } from './bluetooth.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private readonly bluetooth: BluetoothService) { 

  }

}
