import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  create(user: User) {
    return this.db.collection('users').add(user);
  }

  update(user: User) {
    delete user.id;
    this.db.doc('users/' + user.id).update(user);
  }

  getAll() {
    return this.db.collection('users').snapshotChanges();
  }

  delete(userId: string) {
    this.db.doc('users/' + userId).delete();
  }

  userExist(userId: string): Promise<boolean> {
    return this.db.firestore.doc(`/users/${userId}`).get()
      .then(docSnapshot => {
        return docSnapshot.exists;
      })
      .catch( error => {
        console.error(error);
        return false;
      });
  }
}
