import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SituationMapComponent } from './situation-map/situation-map.component';
import { DeviceManagerComponent } from './device-manager/device-manager.component';

const routes: Routes = [
  {
    path: 'device',
    component: DeviceManagerComponent
  },
  {
    path: 'map',
    component: SituationMapComponent
    // loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
