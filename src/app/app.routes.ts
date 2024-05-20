import { Route } from '@angular/router';
import { StatsComponent } from './stats/stats.component';
import { BaseComponent } from './base/base.component';
import { MatchComponent } from './match/match.component';

export interface CustomRoute extends Route {
  icon: string;
  displayName: string;
}

export declare type CustomRoutes = CustomRoute[];
export const routes: CustomRoutes = [
  { path: '', component: MatchComponent, icon: 'home', displayName: 'Matches' },
  {
    path: 'stats',
    component: BaseComponent,
    icon: 'view_timeline',
    displayName: 'Stats',
  },
  {
    path: 't20-charts',
    component: StatsComponent,
    icon: 'bolt',
    displayName: 'T20 Charts',
  },
];
