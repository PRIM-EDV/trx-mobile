import { AfterContentInit, Component, ContentChild, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'ph-navigation-bar-target',
  templateUrl: './navigation-bar-target.component.html',
  styleUrls: ['./navigation-bar-target.component.scss'],
})
export class NavigationBarTargetComponent  implements AfterContentInit, OnInit {

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
