import { Component, ElementRef} from '@angular/core';

@Component({
    selector: 'ph-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss'],
    standalone: true
})
export class PhNavigationBar {
  public isActive: boolean = false;
  public activatedRoute: string = ''; 

  constructor(public ref: ElementRef) {
   
  }
}
