import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapModule } from './map/map.module';
import { SituationMapComponent } from './situation-map.component';

@NgModule({
  imports: [
    CommonModule,
    MapModule,
  ],
  declarations: [SituationMapComponent],
  exports: [SituationMapComponent]
})
export class SituationMapModule { }
