import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import {Injectable} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {CanActivate} from '@angular/router';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoggedInGuard implements CanActivate {
  user: Observable<firebase.User>;

  constructor(
      private readonly afAuth: AngularFireAuth, private router: Router,
      private snackbar: MdSnackBar) {
    this.user = afAuth.authState;
  }

  canActivate() {
    return this.user.map((u) => {
      if (!u || !u.uid) {
        this.snackbar.open(
            'You need to be an logged in to access that.', 'dismiss',
            {duration: 3000});
        this.router.navigate(['/']);
        return false;
      }
      return true;
    });
  }
}