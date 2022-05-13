import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
// import {auth, User} from 'firebase/compat/app';
import {GoogleAuthProvider, User} from 'firebase/auth'
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
    this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
