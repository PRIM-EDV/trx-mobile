import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SituationMapModule } from './situation-map/situation-map.module';
import { ElementsModule } from './elements/elements.module';
import { DeviceManagerComponent } from './device-manager/device-manager.component';
import { PhNavigationBar } from './infrastructure/ui/navigation-bar/navigation-bar-component/navigation-bar.component';
import { PhNavigationBarTarget } from './infrastructure/ui/navigation-bar/navigation-bar-target-component/navigation-bar-target.component';

@NgModule({
  declarations: [AppComponent, DeviceManagerComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    PhNavigationBar,
    PhNavigationBarTarget,
    SituationMapModule,
    ElementsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
