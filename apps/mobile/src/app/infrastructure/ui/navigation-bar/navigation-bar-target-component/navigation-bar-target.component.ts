import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, HostListener, Input, OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'ph-navigation-bar-target',
    imports: [
      CommonModule
    ],
    templateUrl: './navigation-bar-target.component.html',
    styleUrls: ['./navigation-bar-target.component.scss'],
    standalone: true
})
export class PhNavigationBarTarget implements AfterContentInit, OnInit {

  @Input() target?: String
  @Input() icon?: String

  public isActive: boolean = false;

  constructor(private router: Router) {
    
  }

  ngOnInit() {
    /* Super whacky, might delete later */
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
        if (event.url == this.target || event.urlAfterRedirects == this.target) {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
    });

  }

  ngAfterContentInit() {

  }

  @HostListener('click')
  onClick(ev: MouseEvent) {
    this.router.navigate([this.target]);
  }

}
