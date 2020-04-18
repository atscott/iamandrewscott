import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CanActivate} from '@angular/router';
import {Router} from '@angular/router';
import {User} from 'firebase/app';
import {Observable, of} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';

@Injectable()
export class AdminUserGuard implements CanActivate {
  user: Observable<User>;

  constructor(private readonly afAuth: AngularFireAuth, private router: Router,
              private db: AngularFireDatabase, private snackbar: MatSnackBar) {
    this.user = afAuth.authState;
  }

  canActivate() {
    const result: Observable<boolean> = this.user.pipe(flatMap((user) => {
      if (!user || !user.uid) {
        this.snackbar.open('You need to be an logged in to access that.',
                           'dismiss', {duration : 3000});
        this.router.navigate([ '/' ]);
        return of(false);
      }
      return this.db.object(`/users/${user.uid}`)
          .valueChanges()
          .pipe(map((userInfo: {admin: boolean}) => {
            if (!userInfo || !userInfo.admin) {
              this.snackbar.open('You need to be an admin to access that.',
                                 'dismiss', {duration : 3000});
              this.router.navigate([ '/' ]);
              return false;
            }
            return true;
          }));
    }));
    return result;
  }
}
