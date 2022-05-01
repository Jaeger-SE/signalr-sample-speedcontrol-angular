import { Injectable } from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr'
import {Observable, ReplaySubject, Subject} from "rxjs";
import {RadarType} from "./constants";

@Injectable()
export class NotificationsRealTimeService {
  private connection: HubConnection;

  private _speedViolation: Subject<SpeedViolationReport> = new Subject<SpeedViolationReport>();
  speedViolation$: Observable<SpeedViolationReport> = this._speedViolation.asObservable();

  private _ready: ReplaySubject<void> = new ReplaySubject<void>();
  ready$: Observable<void> = this._ready.asObservable();

  constructor() {
    this.connection = new HubConnectionBuilder()
        .withUrl("https://localhost:5001/notifications")
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

  async startAssignation(radarId: RadarType): Promise<void> {
    await this.connection.send('StartAssignation', {RadarId:radarId});
  }

  async stopAssignation(radarId: RadarType): Promise<void> {
    await this.connection.send('StopAssignation', {RadarId:radarId});
  }

  private registerEvents(): void {
    this.connection.on('OnSpeedLimitViolation', (x: SpeedViolationReport)=> {
      this._speedViolation.next(x);
    });
  }
}

export interface SpeedViolationReport {
  CarPlate:string;
  SpeedReported: number;
  RadarId: string;
}