import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationBarModule } from './navigation-bar/navigation-bar.module';
import { SituationMapModule } from './situation-map/situation-map.module';
import { ElementsModule } from './elements/elements.module';
import { DeviceManagerComponent } from './device-manager/device-manager.component';

@NgModule({
  declarations: [AppComponent, DeviceManagerComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    NavigationBarModule,
    SituationMapModule,
    ElementsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
