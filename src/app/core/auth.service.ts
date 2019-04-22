import { Injectable, Output, EventEmitter } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authData: Subject<{isAuthenticated: boolean, data: any}>;

  constructor(public afAuth: AngularFireAuth) {
    this.authData = new Subject<{isAuthenticated: boolean, data: any}>();
  }

  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  AuthLogin(provider) {
    const authResult = {
      isAuthenticated: false,
      data: null
    };
    return this.afAuth.auth.signInWithPopup(provider)
    .then((authData) => {
        authResult.isAuthenticated = true;
        authResult.data = authData;
        this.authData.next(authResult);
    }).catch((error) => {
        console.log(error);
        this.authData.next(authResult);
    });
  }
}
