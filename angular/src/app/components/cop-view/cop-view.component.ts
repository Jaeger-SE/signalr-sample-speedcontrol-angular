import {Component, Input} from '@angular/core';
import {TerminalService} from "primeng/terminal";
import {RadarRealTimeService} from "../../services/radar-real-time.service";
import {NotificationsRealTimeService} from "../../services/notifications-real-time.service";

@Component({
  selector: 'app-cop-view',
  templateUrl: './cop-view.component.html',
  styleUrls: ['./cop-view.component.scss'],
  providers: [TerminalService, NotificationsRealTimeService]
})
export class CopViewComponent {

  @Input() id:string = '';

  logs: string[] = [];

  constructor(private readonly notificationsRealTimeService: NotificationsRealTimeService) {
    this.notificationsRealTimeService.ready$.subscribe(() => {
      // Init
    });
    this.notificationsRealTimeService.speedViolation$.subscribe(report => {
      this.logs = [...this.logs, `Speed violation detected; Intercept: ${JSON.stringify(report)}`];
    });
  }

  clear(): void {
    this.logs = [];
  }

  async startRueNeuve(): Promise<void> {
    this.notificationsRealTimeService.startAssignation('rue-neuve')
        .then(() => this.logs = [...this.logs, `Start assignation on Rue Neuve`]);
  }

  async stopRueNeuve(): Promise<void> {
    this.notificationsRealTimeService.stopAssignation('rue-neuve')
        .then(() => this.logs = [...this.logs, `Stop assignation on Rue Neuve`]);
  }

  async startRueDeLaLoi(): Promise<void> {
    this.notificationsRealTimeService.startAssignation('rue-de-la-loi')
        .then(() => this.logs = [...this.logs, `Start assignation on Rue de la Loi`]);
  }

  async stopRueDeLaLoi(): Promise<void> {
    this.notificationsRealTimeService.stopAssignation('rue-de-la-loi')
        .then(() => this.logs = [...this.logs, `Stop assignation on Rue de la Loi`]);
  }
}
