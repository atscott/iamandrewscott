import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MdAutocompleteModule, MdButtonModule, MdCardModule, MdCheckboxModule, MdExpansionModule, MdGridListModule, MdIconModule, MdInputModule, MdListModule, MdMenuModule, MdRadioModule, MdSelectModule, MdSidenavModule, MdSnackBarModule, MdToolbarModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Route, RouterModule} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import {environment} from '../environments/environment';

import {AdminUserGuard} from './admin-user-guard';
import {AppComponent} from './app.component';
import {LandingComponent} from './landing/landing.component';
import {IngredientComponent} from './new-recipe/ingredient/ingredient.component';
import {NewRecipeComponent} from './new-recipe/new-recipe.component';
import {ProgressiveBackgroundImageDirective} from './images/progressive-background-image.directive';
import {ProgressiveImageComponent} from './images/progressive-image.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeViewComponent} from './recipe-view/recipe-view.component';
import {VerifiedUserGuard} from './verified-user-guard';
import {LoggedInGuard} from './logged-in-guard';


const routes: Route[] = [
  {path: '', component: LandingComponent},
  {
    path: 'list',
    component: RecipeListComponent,
    // canActivate: [VerifiedUserGuard]
  },
  {
    path: 'recipe',
    component: NewRecipeComponent,
    canActivate: [AdminUserGuard]
  },
  {
    path: 'recipe/edit/:recipeId',
    component: NewRecipeComponent,
    canActivate: [AdminUserGuard]
  },
  {
    path: 'recipe/view/:recipeId',
    component: RecipeViewComponent,
    // canActivate: [VerifiedUserGuard]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NewRecipeComponent,
    RecipeListComponent,
    IngredientComponent,
    LandingComponent,
    RecipeViewComponent,
    ProgressiveImageComponent,
    ProgressiveBackgroundImageDirective,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    MdInputModule,
    MdCardModule,
    MdButtonModule,
    MdSelectModule,
    MdAutocompleteModule,
    MdCheckboxModule,
    MdRadioModule,
    MdSidenavModule,
    MdToolbarModule,
    MdIconModule,
    MdMenuModule,
    MdGridListModule,
    MdSnackBarModule,
    MdExpansionModule,
    MdListModule,
  ],
  providers: [VerifiedUserGuard, AdminUserGuard, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
