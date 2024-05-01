import { Component } from '@angular/core';
import {
  heroUsers,
  heroTrophy,
  heroRocketLaunch,
  heroShieldCheck,
  heroScale,
  heroPencilSquare,
  heroXMark,
} from '@ng-icons/heroicons/outline';
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core';

@Component({
  selector: 'app-info-section',
  standalone: true,
  providers: [
    provideIcons({
      heroUsers,
      heroTrophy,
      heroRocketLaunch,
      heroShieldCheck,
      heroScale,
      heroPencilSquare,
      heroXMark,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
  imports: [NgIconComponent],
  templateUrl: './info-section.component.html',
  styleUrl: './info-section.component.scss',
})
export class InfoSectionComponent {}
