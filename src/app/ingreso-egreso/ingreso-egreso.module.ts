import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {IngresoEgresoComponent} from "./ingreso-egreso.component";
import {EstadisticasComponent} from "./estadisticas/estadisticas.component";
import {DetalleComponent} from "./detalle/detalle.component";
import {OrdenIngresoPipe} from "../pipes/orden-ingreso.pipe";
import {ReactiveFormsModule} from "@angular/forms";
import {BaseChartDirective, provideCharts, withDefaultRegisterables} from "ng2-charts";
import {SharedModule} from "../shared/shared.module";
import {DashboardRoutesModule} from "../dashboard/dashboard.routes.module";
import {StoreModule} from "@ngrx/store";
import {ingresoEgresoReducer} from "./ingreso-egreso.reducer";


@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticasComponent,
    DetalleComponent,
    OrdenIngresoPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
    ReactiveFormsModule,
    BaseChartDirective,
    SharedModule,
    DashboardRoutesModule
  ],
  providers: [
    provideCharts(withDefaultRegisterables())
  ]
})
export class IngresoEgresoModule {
}
