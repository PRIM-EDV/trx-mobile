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
      if(!ref.nativeElement.contains(e.target)) {
        this.isActive = !this.isActive;
        console.log(this.isActive)
      }
    });
  }

  ngOnInit() {

  }
}
