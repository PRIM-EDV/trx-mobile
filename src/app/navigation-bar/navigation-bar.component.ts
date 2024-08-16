import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'ph-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent {
  public isActive: boolean = false;
  public activatedRoute: string = ''; 

  constructor(public ref: ElementRef, private router: Router) {
   
  }
}
