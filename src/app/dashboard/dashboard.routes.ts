import {Routes} from "@angular/router";
import {EstadisticasComponent} from "../ingreso-egreso/estadisticas/estadisticas.component";
import {IngresoEgresoComponent} from "../ingreso-egreso/ingreso-egreso.component";
import {DetalleComponent} from "../ingreso-egreso/detalle/detalle.component";

export const dashboardRoutes: Routes = [
  {path: '', component: EstadisticasComponent},
  {path: 'ingreso-egreso', component: IngresoEgresoComponent},
  {path: 'detalle', component: DetalleComponent},
]
