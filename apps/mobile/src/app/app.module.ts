import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PhNavigationBar } from './infrastructure/ui/navigation-bar/navigation-bar-component/navigation-bar.component';
import { PhNavigationBarTarget } from './infrastructure/ui/navigation-bar/navigation-bar-target-component/navigation-bar-target.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    PhNavigationBar,
    PhNavigationBarTarget
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
