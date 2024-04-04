import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MainContractService } from './services/main-contract.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    MainContractService,
    provideAnimationsAsync(),
    provideLottieOptions({
      player: () => player,
    }),
  ],
};
