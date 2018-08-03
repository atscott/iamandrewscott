import {APP_BASE_HREF} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Route, RouterModule} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import {environment} from '../environments/environment';

import {AdminUserGuard} from './admin-user-guard';
import {AppComponent} from './app.component';
import {
  ProgressiveBackgroundImageDirective
} from './images/progressive-background-image.directive';
import {ProgressiveImageComponent} from './images/progressive-image.component';
import {LandingComponent} from './landing/landing.component';
import {LoggedInGuard} from './logged-in-guard';
import {
  IngredientComponent
} from './new-recipe/ingredient/ingredient.component';
import {NewRecipeComponent} from './new-recipe/new-recipe.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeViewComponent} from './recipe-view/recipe-view.component';
import {VerifiedUserGuard} from './verified-user-guard';

const routes: Route[] = [
  {path : '', component : LandingComponent},
  {
    path : 'list',
    component : RecipeListComponent,
    canActivate : [ VerifiedUserGuard ]
  },
  {
    path : 'recipe',
    component : NewRecipeComponent,
    canActivate : [ AdminUserGuard ]
  },
  {
    path : 'recipe/edit/:recipeId',
    component : NewRecipeComponent,
    canActivate : [ AdminUserGuard ]
  },
  {
    path : 'recipe/view/:recipeId',
    component : RecipeViewComponent,
    canActivate : [ VerifiedUserGuard ]
  },
];

@NgModule({
  declarations : [
    AppComponent,
    NewRecipeComponent,
    RecipeListComponent,
    IngredientComponent,
    LandingComponent,
    RecipeViewComponent,
    ProgressiveImageComponent,
    ProgressiveBackgroundImageDirective,
  ],
  imports : [
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
  ],
  providers : [
    VerifiedUserGuard, AdminUserGuard, LoggedInGuard,
    {provide : APP_BASE_HREF, useValue : '/'}
  ],
  bootstrap : [ AppComponent ]
})
export class AppModule {
}
