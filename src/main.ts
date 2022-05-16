import {APP_BASE_HREF} from '@angular/common';
import {enableProdMode, importProvidersFrom} from '@angular/core';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {bootstrapApplication} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app/app.component';
import {routes} from './app/routes';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom(AngularFireModule.initializeApp(environment.firebase)),
    importProvidersFrom(AngularFireDatabaseModule),
    importProvidersFrom(AngularFireAuthModule),
    importProvidersFrom(MatSnackBarModule),
    importProvidersFrom(BrowserAnimationsModule),
  ]
});
