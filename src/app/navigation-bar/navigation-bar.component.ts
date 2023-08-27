import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'ph-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent  implements OnInit {

  public isActive: boolean = false;

  constructor(public ref: ElementRef) {
    window.addEventListener('click', (e) => {  
      if(!e.composedPath().includes(ref.nativeElement)) {
        this.isActive = !this.isActive;
      }
    });
  }

  ngOnInit() {

  }
}
