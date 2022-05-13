import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {auth, User} from 'firebase';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  readonly hqImage =
      'https://lh3.googleusercontent.com/m0zbc2_nHdhSGhyJ5X_Ga1x5w6frKb06pggF8rUnAMel7togCUc98VJ7FbfFkeeAawOA4q19rN6JoNGGDFKLS1pSxzvfIWa3EHQwWErEWGSU0B_SH-Fb6pPVWs3TapRlvuaaBqoNn3ZDS9a5WmH_aDn0sHoPv-BY2TUJqlLm0GvBu2q_vc7j-ElkiS_boQ6qt4MnY83_aS60nYkFrG6RZI2nH5uiN8DvJ1C3sUkJaotINByfjq1MgBlSLwH7sMfIt1C9_NuEfXWufdEvUSfrYm5AqegnX3_xaYV_C78NT-8Vx-IJAb8l7G-GH2d0qP6Phh8LSjhEYf46xvGdEfhESOMghfss8eB7I0dl1H9s_hneqg-b9kaPmuEGGfp_qSyB_6cqvNpanUMRZXFO_XxroXtKeCYvWuzJDRTWs2b3ReQPy5-j3ufZ5ZnZtjX40olFShN6HenpFFMGxNSUwN9MteDu0lodS86leuCbQYQxMLBGRDbb03X-avaYLuhFnGwhZgIWsky4iEod0rWR-kFJDyIy7m9tDLWKWcbnSmeoOSDX6dsJDdtBt84Q-SHoEaVZGVym7pqzE-DbemC6rDL18QHi-Cwu-tTPlEC8rz-rJq8rR3gN3zqjmK_gMOevnLf2cwp8noZoDO84akmKVc1roih_qTrIc7MwbbtDhV546qq1k4c=s0-no';
  readonly lqImage =
      'https://lh3.googleusercontent.com/m0zbc2_nHdhSGhyJ5X_Ga1x5w6frKb06pggF8rUnAMel7togCUc98VJ7FbfFkeeAawOA4q19rN6JoNGGDFKLS1pSxzvfIWa3EHQwWErEWGSU0B_SH-Fb6pPVWs3TapRlvuaaBqoNn3ZDS9a5WmH_aDn0sHoPv-BY2TUJqlLm0GvBu2q_vc7j-ElkiS_boQ6qt4MnY83_aS60nYkFrG6RZI2nH5uiN8DvJ1C3sUkJaotINByfjq1MgBlSLwH7sMfIt1C9_NuEfXWufdEvUSfrYm5AqegnX3_xaYV_C78NT-8Vx-IJAb8l7G-GH2d0qP6Phh8LSjhEYf46xvGdEfhESOMghfss8eB7I0dl1H9s_hneqg-b9kaPmuEGGfp_qSyB_6cqvNpanUMRZXFO_XxroXtKeCYvWuzJDRTWs2b3ReQPy5-j3ufZ5ZnZtjX40olFShN6HenpFFMGxNSUwN9MteDu0lodS86leuCbQYQxMLBGRDbb03X-avaYLuhFnGwhZgIWsky4iEod0rWR-kFJDyIy7m9tDLWKWcbnSmeoOSDX6dsJDdtBt84Q-SHoEaVZGVym7pqzE-DbemC6rDL18QHi-Cwu-tTPlEC8rz-rJq8rR3gN3zqjmK_gMOevnLf2cwp8noZoDO84akmKVc1roih_qTrIc7MwbbtDhV546qq1k4c=w26-h35-no';
  user: Observable<User>;

  constructor(private readonly afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  login() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}
