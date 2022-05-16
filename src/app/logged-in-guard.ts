import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CanActivate} from '@angular/router';
import {Router} from '@angular/router';
import {User} from 'firebase/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class LoggedInGuard implements CanActivate {
  user: Observable<User>;

  constructor(
      private readonly afAuth: AngularFireAuth, private router: Router,
      private snackbar: MatSnackBar) {
    this.user = afAuth.authState;
  }

  canActivate() {
    return this.user.pipe(map((u) => {
      if (!u || !u.uid) {
        this.snackbar.open(
            'You need to be an logged in to access that.', 'dismiss',
            {duration: 3000});
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }));
  }
}
