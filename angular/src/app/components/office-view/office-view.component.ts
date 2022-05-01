import {Component, Input} from '@angular/core';
import {TerminalService} from "primeng/terminal";
import {RadarRealTimeService, SpeedReport} from "../../services/radar-real-time.service";

@Component({
  selector: 'app-office-view',
  templateUrl: './office-view.component.html',
  styleUrls: ['./office-view.component.scss'],
  providers: [RadarRealTimeService]
})
export class OfficeViewComponent {

  @Input() id:string = '';

  logs: string[] = [];

  constructor(private readonly radarRealTimeService: RadarRealTimeService) {
    this.radarRealTimeService.ready$.subscribe(() => {
      this.radarRealTimeService.listeningOn('rue-neuve')
          .then(
              () => {},
              (error) => console.log(error)
          );
      this.radarRealTimeService.listeningOn('rue-de-la-loi')
          .then(
              () => {},
              (error) => console.log(error)
          );
    });
    this.radarRealTimeService.speedReport$.subscribe(report => {
      this.logs = [...this.logs, `New speed report: ${JSON.stringify(report)}`];
    });
  }

  clear(): void {
    this.logs = [];
  }

}
