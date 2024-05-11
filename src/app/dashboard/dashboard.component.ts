import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import {filter, Subscription} from "rxjs";
import {IngresoEgresoService} from "../services/ingreso-egreso.service";
import {setItems} from "../ingreso-egreso/ingreso-egreso.actions";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  private store = inject(Store<AppState>)
  private ingresoEgresoService = inject(IngresoEgresoService)
  userSubscription: Subscription | undefined
  ingresosEgresosSubscription: Subscription | undefined

  ngOnInit(): void {
    this.userSubscription = this.store.select("user")
      .pipe(filter(auth => auth.user != null))
      .subscribe(({user}) =>
        this.ingresosEgresosSubscription = this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
          .subscribe((ingresosEgresosFB: any) => {
            console.log(ingresosEgresosFB)
            this.store.dispatch(setItems({items: ingresosEgresosFB}))
          })
      )
  }

  ngOnDestroy(): void {
    this.ingresosEgresosSubscription?.unsubscribe()
    this.userSubscription?.unsubscribe()
  }
}
