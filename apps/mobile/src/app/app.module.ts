import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DeviceManagerComponent } from './device-manager/device-manager.component';
import { PhNavigationBar } from './infrastructure/ui/navigation-bar/navigation-bar-component/navigation-bar.component';
import { PhNavigationBarTarget } from './infrastructure/ui/navigation-bar/navigation-bar-target-component/navigation-bar-target.component';
import { InformationComponent } from './information/information.component';

@NgModule({
  declarations: [AppComponent, DeviceManagerComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    InformationComponent,
    PhNavigationBar,
    PhNavigationBarTarget
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
