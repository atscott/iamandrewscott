import {Route} from '@angular/router';

import {AdminUserGuard} from './admin-user-guard';
import {LandingComponent} from './landing/landing.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeViewComponent} from './recipe-view/recipe-view.component';
import {VerifiedUserGuard} from './verified-user-guard';

export const routes: Route[] = [
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
        import('./new-recipe/routes').then(m => m.routes),
    canLoad: [AdminUserGuard],
    canActivate: [AdminUserGuard],
  },
];
