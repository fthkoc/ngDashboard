import { Component, OnInit } from '@angular/core';
import { LINE_CHART_COLORS } from '../../shared/chart.colors';
import { SalesDataService } from 'src/app/services/sales-data.service';
import * as moment from 'moment';

// const SAMPLE_LINECHART_DATA: any[] = [
//   { data: [32, 14, 46, 23, 38, 56], label: 'Sentiment Analysis'},
//   { data: [12, 18, 26, 13, 28, 26], label: 'Image Recognition'},
//   { data: [52, 34, 49, 53, 68, 62], label: 'Forecasting'}
// ];

// const SAMPLE_LINECHART_LABELS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor(private salesData: SalesDataService) { }

  topCustomers: string[];
  allOrders: any[];

  public lineChartData: any[];
  public lineChartLabels: string[];
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors = LINE_CHART_COLORS;

  ngOnInit() {
    this.salesData.getOrders(1, 100).subscribe(response => {
      this.allOrders = response['page']['data'];
      this.salesData.getOrdersByCustomer(3).subscribe((customer: any[]) => {
        this.topCustomers = customer.map(x => x['name']);

        const allChartData = this.topCustomers.reduce((result, i) => {
          result.push(this.getChartData(this.allOrders, i));
          return result;
        }, []);

        let dates = allChartData.map(x => x['data']).reduce((a, i) => {
          a.push(i.map(o => new Date(o[0])));
          return a;
        }, []);

        dates = [].concat.apply([], dates);

        const r = this.getCustomerOrdersByDate(allChartData, dates)['data'];

        this.lineChartLabels = r[0]['orders'].map(o => o['date']);
        this.lineChartData = [
          {
            data: r[0].orders.map(x => x.total),
            label: r[0]['customer']
          },
          {
            data: r[1].orders.map(x => x.total),
            label: r[1]['customer']
          },
          {
            data: r[2].orders.map(x => x.total),
            label: r[2]['customer']
          }
        ];
      });
    });
  }

  // Prepares chart data by restructuring incoming data from API
  getChartData(allOrders: any, name: string) {
    const customerOrders = allOrders.filter(order => order.customer.name === name);

    const formattedOrders = customerOrders.reduce((r, e) => {
      r.push([e.timePlaced, e.total]);
      return r;
    }, []);

    const result = { customer: name, data: formattedOrders };
    return result;
  }

  // Sums orders for customers in given dates
  getCustomerOrdersByDate(orders: any, dates: any) {
    const customers = this.topCustomers;
    const prettyDates = dates.map(x => this.toFriendlyDate(x));
    const u = Array.from(new Set(prettyDates)).sort();

    const result = {};
    const dataSets = result['data'] = [];

    customers.reduce((x, y, i) => {
      const customerOrders = [];
      dataSets[i] = {
        customer: y,
        orders: u.reduce((r, e, j) => {
          const obj = {};
          obj['date'] = e;
          obj['total'] = this.getCustomerDateTotal(e, y);
          customerOrders.push(obj);
          return customerOrders;
        })
      };
      return x;
    }, []);

    return result;
  }

  // Formats date
  toFriendlyDate(date: Date) {
    return moment(date).endOf('day').format('DD-MM-YY');
  }

  // Calculates sum for given customer in given date
  getCustomerDateTotal(date: any, customer: string) {
    const r = this.allOrders.filter(o => o.customer.name === customer
      && this.toFriendlyDate(o.timePlaced) === date);

    const result = r.reduce((a, b) => {
      return a + b.total;
    }, 0);

    return result;
  }
}
