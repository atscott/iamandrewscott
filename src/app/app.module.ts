import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MdButtonModule, MdCardModule, MdInputModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Route, RouterModule} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {IngredientComponent} from './new-recipe/ingredient/ingredient.component';
import {NewRecipeComponent} from './new-recipe/new-recipe.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';

const routes: Route[] = [
  {path: '', component: RecipeListComponent},
  {path: 'recipe', component: NewRecipeComponent},
  {path: 'recipe/edit/:recipeId', component: NewRecipeComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NewRecipeComponent,
    RecipeListComponent,
    IngredientComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
