import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map, Subscription} from "rxjs";
import {Usuario} from "../models/usuario.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AppState} from "../app.reducer";
import * as authActions from "../auth/auth.actions";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription: Subscription | undefined

  constructor(public auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private store: Store<AppState>) {
  }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      if (fuser) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
          .subscribe(fireStoreUser => {
            console.log(fireStoreUser)
            const user = Usuario.fromFirebase(fireStoreUser)

            this.store.dispatch(authActions.setUser({user}))
          })
      } else {
        this.userSubscription?.unsubscribe()
        this.store.dispatch(authActions.unSetUser())
      }
    })
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        const newuser = new Usuario(user!.uid, nombre, user?.email!)

        return this.firestore.doc(`${user!.uid}/usuario`).set({...newuser})
      })
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut()
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fUser => fUser != null)
    )
  }
}
