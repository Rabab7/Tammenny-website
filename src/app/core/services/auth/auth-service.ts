
import { inject, Injectable } from '@angular/core';
import {
  Auth,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  firestore = inject(Firestore);

  register(email: string, password: string, username: string, role: string): Observable<any> {
    
    const registerData = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(
      async (res) => {
        await updateProfile(res.user, { displayName: username });

       
        const userDocRef = doc(this.firestore, `users/${res.user.uid}`);
        await setDoc(userDocRef, {
          name: username,
          email: email,
          role: role,
          createdAt: new Date(),
        });

      }
    );
    return from(registerData);
  }

  // sendVerificationEmail(user:User){
  //   return sendEmailVerification(user)
  // }

  // isEmailVerified():boolean{
  //   return this.firebaseAuth.currentUser?.emailVerified ?? false;
  // }

  login(email: string, password: string): Observable<any> {
    const registerData = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(
      () => {}
    );
    return from(registerData);
  }

  sendPasswordResetLink(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.firebaseAuth, email));
  }

  confirmPasswordReset(oobCode: string, newPassword: string): Observable<void> {
    return from(confirmPasswordReset(this.firebaseAuth, oobCode, newPassword));
  }
}
