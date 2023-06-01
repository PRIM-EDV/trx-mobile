import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapModule } from './map/map.module';
import { SituationMapComponent } from './situation-map.component';



@NgModule({
  declarations: [SituationMapComponent],
  imports: [
    CommonModule,
    MapModule,
  ],
  exports: [SituationMapComponent]
})
export class SituationMapModule { }
