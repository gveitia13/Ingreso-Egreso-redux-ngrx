import {Component, inject, OnInit} from '@angular/core';
import {AppState} from "../../app.reducer";
import {Store} from "@ngrx/store";
import {IngresoEgreso} from "../../models/ingreso-egreso.model";
import {ChartData, ChartEvent, ChartType} from 'chart.js'

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css',
})
export class EstadisticasComponent implements OnInit {

  private store = inject(Store<AppState>)
  ingresos = 0
  egresos = 0
  totalEgresos = 0
  totalIngresos = 0

  public doughnutChartLabels: string[] = [
    'Ingreso',
    'Egreso',
  ]
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {data: []},
    ]
  }
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({event, active,}: { event: ChartEvent; active: object[]; }): void {
    console.log(event, active);
  }

  public chartHovered({event, active,}: { event: ChartEvent; active: object[]; }): void {
    console.log(event, active);
  }

  ngOnInit(): void {
    this.store.select('ingresosEgresos').subscribe(({items}) => this.generarEstadistica(items))
  }

  generarEstadistica(items: IngresoEgreso[]) {
    this.totalEgresos = 0
    this.totalIngresos = 0
    this.ingresos = 0
    this.egresos = 0
    Object.values(items).forEach(item => {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto
        this.ingresos++
      } else {
        this.totalEgresos += item.monto
        this.egresos++
      }
    })
    this.doughnutChartData.datasets = [{data: [this.totalIngresos, this.totalEgresos]}]
  }
}
