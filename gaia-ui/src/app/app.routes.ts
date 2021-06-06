import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule) },
  { path: 'group', loadChildren: () => import('./modules/group/group.module').then((m) => m.GroupModule) },
  { path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then((m) => m.SettingsModule) },
];

export const approutes: Routes = [
  { path: '', component: HomeComponent },
];
