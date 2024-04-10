import { Component } from '@angular/core';
import { SocialIconsComponent } from '../social-icons/social-icons.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SocialIconsComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
