import { Routes } from '@angular/router';
import { PotOfGoldComponent } from './pages/pot-of-gold/pot-of-gold.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: PotOfGoldComponent },
];
