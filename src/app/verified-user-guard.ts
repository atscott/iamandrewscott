import 'rxjs/add/operator/mergeMap';

import {Injectable} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {CanActivate} from '@angular/router';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';



@Injectable()
export class VerifiedUserGuard implements CanActivate {
  user: Observable<firebase.User>;

  constructor(
      private readonly afAuth: AngularFireAuth, private router: Router,
      private db: AngularFireDatabase, private snackbar: MdSnackBar) {
    this.user = afAuth.authState;
  }

  canActivate() {
    return this.user.flatMap((u) => {
      if (!u || !u.uid) {
        this.snackbar.open(
            'You need to be an logged in to access that.', 'dismiss',
            {duration: 3000});
        this.router.navigate(['/']);
        return Observable.of(false);
      }
      return this.db.object(`/users/${u.uid}`).map((u) => {
        if (!u.$exists()) {
          this.snackbar.open(
              'You need to be an authorized user to access that.', 'dismiss',
              {duration: 3000});
          this.router.navigate(['/']);
          return false;
        }
        return true;
      });
    });
  }
}