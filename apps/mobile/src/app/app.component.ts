import { Component, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { PhNavigationBar } from "./infrastructure/ui/navigation-bar/navigation-bar-component/navigation-bar.component";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  standalone: false,
})
export class AppComponent {
  public currentRoute: string = "";
  public showNavigationBar: boolean = true;
  public showInformationBar: boolean = true;

  @ViewChild(PhNavigationBar) navigationBar!: PhNavigationBar;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    window.addEventListener("click", (e) => {
      if (!e.composedPath().includes(this.navigationBar.ref.nativeElement)) {
        this.showNavigationBar = !this.showNavigationBar;
      }
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        console.log(this.currentRoute);
        if (this.currentRoute.endsWith("/map")) {
          this.showInformationBar = true;
        } else {
          this.showInformationBar = false;
        }
      }
    });
  }
}
