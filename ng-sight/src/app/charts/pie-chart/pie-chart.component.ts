import { Component, OnInit, Input } from '@angular/core';
import _ from 'lodash';
import { THEME_COLORS } from 'src/app/shared/theme.colors';

const theme = 'Default';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
// tslint:disable:no-string-literal
export class PieChartComponent implements OnInit {

  constructor() { }

  @Input() inputData: any;
  @Input() limit: number;

  pieChartData: number[];
  pieChartLabels: string[];
  colors: any[] = [
    {
      backgroundColor: this.themeColors(theme),
      borderColor: '#111'
    }
  ];
  pieChartType = 'doughnut';


  ngOnInit() {
    this.parseChartData(this.inputData, this.limit);
  }

  parseChartData(response: any, limit?: number) {
    const rawData = response.slice(0, limit);
    this.pieChartData = rawData.map(x => _.values(x)[1]);
    this.pieChartLabels = rawData.map(x => _.values(x)[0]);
  }

  themeColors(setName: string): string[] {
    const colors = THEME_COLORS.slice(0)
      .find(set => set.name === setName).colorSet;
    return colors;
  }
}
