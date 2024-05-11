import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IngresoEgreso} from "../../models/ingreso-egreso.model";
import {Subscription} from "rxjs";
import {IngresoEgresoService} from "../../services/ingreso-egreso.service";
import Swal from "sweetalert2";
import {AppStateIngresoEgreso} from "../ingreso-egreso.reducer";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit, OnDestroy {

  private store = inject(Store<AppStateIngresoEgreso>)
  private ingresoEgresoService = inject(IngresoEgresoService)
  ingresosEgresos: IngresoEgreso[] = []
  ingresosEgresosSubscription: Subscription | undefined


  ngOnInit(): void {
    this.ingresosEgresosSubscription = this.store.select('ingresosEgresos').subscribe(({items}) => {
      console.log(items)
      this.ingresosEgresos = Object.values(items)
    })
  }

  ngOnDestroy(): void {
    this.ingresosEgresosSubscription?.unsubscribe()
  }

  borrar(uid: string | undefined) {
    if (uid != null) {
      console.log(uid)
      this.ingresoEgresoService.borrarIngresoEgreso(uid)
        .then(() => Swal.fire('Borrado', 'Item borrado', 'success'))
        .catch((err) => Swal.fire('Error', err.message, 'error'))
    }
  }
}
