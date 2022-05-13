import {APP_BASE_HREF} from '@angular/common';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Route, RouterModule} from '@angular/router';

import {environment} from '../environments/environment';

import {AdminUserGuard} from './admin-user-guard';
import {AppComponent} from './app.component';
import {ProgressiveBackgroundImageDirective} from './images/progressive-background-image.directive';
import {ProgressiveImageComponent} from './images/progressive-image.component';
import {LandingComponent} from './landing/landing.component';
import {LoggedInGuard} from './logged-in-guard';
import {IngredientSelectorComponent} from './recipe-list/ingredient-selector/ingredient-selector.component';
import {RecipeCardComponent} from './recipe-list/recipe-card/recipe-card.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeViewComponent} from './recipe-view/recipe-view.component';
import {VerifiedUserGuard} from './verified-user-guard';

const routes: Route[] = [
  {path: '', component: LandingComponent},
  {
    path: 'list',
    component: RecipeListComponent,
    canActivate: [VerifiedUserGuard]
  },
  {
    path: 'recipe/view/:recipeId',
    component: RecipeViewComponent,
    canActivate: [VerifiedUserGuard]
  },
  {
    path: 'recipe',
    loadChildren: () =>
        import('./new-recipe/new-recipe.module').then(m => m.NewRecipeModule),
    canLoad: [AdminUserGuard],
    canActivate: [AdminUserGuard],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    LandingComponent,
    RecipeViewComponent,
    ProgressiveImageComponent,
    ProgressiveBackgroundImageDirective,
    IngredientSelectorComponent,
    RecipeCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatListModule,
    MatChipsModule,
  ],
  providers: [
    VerifiedUserGuard, AdminUserGuard, LoggedInGuard,
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
