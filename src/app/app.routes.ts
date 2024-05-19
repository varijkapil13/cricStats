import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StatsComponent } from './stats/stats.component';
import { BaseComponent } from './base/base.component';

export const routes: Routes = [
  { path: '', component: BaseComponent },
  { path: 'stats', component: StatsComponent },
];
