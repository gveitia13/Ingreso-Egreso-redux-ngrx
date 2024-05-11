import {Injectable} from '@angular/core';
import 'firebase/firestore'
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IngresoEgreso} from "../models/ingreso-egreso.model";
import {AuthService} from "./auth.service";
import {map} from "rxjs";
import {doc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) {
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    return this.firestore.doc(`${this.authService.user?.uid}/ingresos-egresos`)
      .collection('items')
      .add({...ingresoEgreso})
  }

  initIngresosEgresosListener = (uid: string) =>
    this.firestore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(doc => ({
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data()!
          })
        ))
      )

  borrarIngresoEgreso = (uidItem: string) =>
    this.firestore.doc(`${this.authService.user?.uid}/ingresos-egresos/items/${uidItem}`).delete()

}
