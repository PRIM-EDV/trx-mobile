import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar.component';
import { NavigationBarTargetComponent } from './navigation-bar-target/navigation-bar-target.component';

@NgModule({
  declarations: [
    NavigationBarComponent,
    NavigationBarTargetComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavigationBarComponent,
    NavigationBarTargetComponent
  ]
})
export class NavigationBarModule { }
