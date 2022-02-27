import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import {MojConfig} from "../moj-config";
import {ChartModel} from "../signalr-primjer-chart/chart-model";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public nizPodataka: ChartModel[];
  constructor() { }
  private hubConnection: signalR.HubConnection
  public startConnection ()  {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl( MojConfig.adresa_servera+'/putanja-signalr-chart')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferChartDataListener (){
    this.hubConnection.on('transferchartdata', (data) => {
      this.nizPodataka = data;
      console.log(data);
    });
  }

  pozoviMetodaHub1() {
    let p = {
      vrijeme:new Date(),
      a:1,
      b:2
    }
    this.hubConnection.invoke('MetodaHub1', p)
      .catch(err => console.error(err));
  }
}
