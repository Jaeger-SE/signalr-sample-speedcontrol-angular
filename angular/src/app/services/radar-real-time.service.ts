import { Injectable } from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr'
import {Observable, ReplaySubject, Subject} from "rxjs";
import {RadarType} from "./constants";

@Injectable()
export class RadarRealTimeService {
  private connection: HubConnection;

  private _speedReport: Subject<SpeedReport> = new Subject<SpeedReport>();
  speedReport$: Observable<SpeedReport> = this._speedReport.asObservable();

  private _ready: ReplaySubject<void> = new ReplaySubject<void>();
  ready$: Observable<void> = this._ready.asObservable();

  constructor() {
    this.connection = new HubConnectionBuilder()
        .withUrl("https://localhost:5001/radar")
        .withAutomaticReconnect()
        .build();

    this.start()
        .then(
            () => {
              this._ready.next();
            },
            (error) => {
              console.log(error);
            }
        );
  }

  private async start(): Promise<void> {
      await this.connection.start();
      this.registerEvents();
      console.log("SignalR Connected.");
  }

  async reportSpeed(speedReport: SpeedReport): Promise<void> {
    await this.connection.send('ReportSpeed', speedReport);
  }

  async listeningOn(radarId:RadarType): Promise<void> {
    await this.connection.send('ListeningOn', {
      RadarId: radarId
    });
  }

  private registerEvents(): void {
    this.connection.on('OnSpeedReportReceived', (x: SpeedReport)=> {
      this._speedReport.next(x);
    });
  }
}

export interface SpeedReport {
  CarPlate:string;
  Speed:number;
  RadarId:string;
}