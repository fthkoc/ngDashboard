import { Component, OnInit } from '@angular/core';
import { SalesDataService } from 'src/app/services/sales-data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
// tslint:disable:no-string-literal
export class BarChartComponent implements OnInit {

  constructor(private salesData: SalesDataService) { }

  orders: any;
  orderLabels: string[];
  orderData: number[];

  public barChartData: any[];
  public barChartLabels: string[];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  ngOnInit() {
    this.salesData.getOrders(1, 100)
      .subscribe(response => {
        const localChartData = this.getChartData(response);
        this.barChartLabels = localChartData.map(x => x[0]).reverse();
        this.barChartData = [{
          data: localChartData.map(x => x[1]),
          label: 'Sales'
        }];
      });
  }

  getChartData(response: any) {
    this.orders = response['page']['data'];
    const data = this.orders.map(o => o.total);

    const formattedOrders = this.orders.reduce((r, e) => {
      r.push([moment(e.timePlaced).format('DD-MM-YY'), e.total]);
      return r;
    }, []);

    const p = [];
    const chartData = formattedOrders.reduce((r, e) => {
      const key = e[0];
      if (!p[key]) {
        p[key] = e;
        r.push(p[key]);
      }
      else {
        p[key][1] += e[1];
      }
      return r;
    }, []);

    return chartData;
  }

}
