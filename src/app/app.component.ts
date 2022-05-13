import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router, RouterModule} from '@angular/router';
// import {auth, User} from 'firebase/compat/app';
import {GoogleAuthProvider, User} from 'firebase/auth'
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    RouterModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Observable<User>;

  constructor(private readonly afAuth: AngularFireAuth, private router: Router) {
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
