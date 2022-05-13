import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
// import {auth, User} from 'firebase/compat/app';
import {User, auth} from 'firebase'
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Observable<User>;

  constructor(
      private readonly afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
  }

  login() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
