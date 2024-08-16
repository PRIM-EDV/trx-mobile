import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ph-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent  implements OnInit {

  @Input() selected = false;
  @Output() selectedChange = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  @HostListener('click')
  onClick(ev: MouseEvent) {
    this.selectedChange.emit();
  }

}
