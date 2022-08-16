import { Component, OnInit } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import {MojConfig} from "../moj-config";
import {ChartModel} from "./chart-model";
import {SignalRService} from "../services/signal-r.service";
@Component({
  selector: 'app-signalr-primjer-chart',
  templateUrl: './signalr-primjer-chart.component.html',
  styleUrls: ['./signalr-primjer-chart.component.css']
})
export class SignalrPrimjerChartComponent implements OnInit {


  constructor(public signalRService: SignalRService) { }

  public chartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public chartLabels: string[] = ['Real time data for the chart'];
  public chartType='bar' as const;
  public chartLegend: boolean = true;
  public colors: any[] = [{ backgroundColor: '#5491DA' }, { backgroundColor: '#E74C3C' }, { backgroundColor: '#82E0AA' }, { backgroundColor: '#E5E7E9' }]


  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
  }


  chartClicked($event: { event?: MouseEvent; active?: {}[] }) {

  }

  pozoviMetodaHub1() {
    this.signalRService.pozoviMetodaHub1();
  }
}
