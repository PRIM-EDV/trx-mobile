import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ph-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent  implements OnInit {

  @Output() switch = new EventEmitter<boolean>();
  public selected: boolean = false;

  constructor() { }

  ngOnInit() {}

  @HostListener('click')
  onClick(ev: MouseEvent) {
    this.selected = !this.selected;
    this.switch.next(this.selected);
  }

}
