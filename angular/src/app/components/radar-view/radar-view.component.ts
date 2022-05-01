import {Component, Input} from '@angular/core';
import {TerminalService} from "primeng/terminal";
import {RadarRealTimeService, SpeedReport} from "../../services/radar-real-time.service";

@Component({
  selector: 'app-radar-view',
  templateUrl: './radar-view.component.html',
  styleUrls: ['./radar-view.component.scss'],
  providers: [RadarRealTimeService]
})
export class RadarViewComponent {
  @Input() id:string = '';

  report120 = (): SpeedReport => ({
    Speed: 120,
    RadarId: this.id,
    CarPlate: '2-ALU-890'
  });

  report10 = (): SpeedReport => ({
    Speed: 10,
    RadarId: this.id,
    CarPlate: '2-ALU-890'
  });

  logs: string[] = [];

  constructor(private readonly radarRealTimeService:RadarRealTimeService) {
  }

  sendSpeed(report: SpeedReport): void{
    this.radarRealTimeService.reportSpeed(report)
        .then(
            () => {
                this.logs = [...this.logs, `Report sent: ${JSON.stringify(report)}`];
            },
            (error) => console.log(error)
        );
  }

  clear(): void {
    this.logs = [];
  }

}
