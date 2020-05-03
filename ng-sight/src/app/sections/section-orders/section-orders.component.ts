import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { SalesDataService } from 'src/app/services/sales-data.service';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.css']
})
// tslint:disable:no-string-literal
export class SectionOrdersComponent implements OnInit {

  orders: Order[] = [];
  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  constructor(private salesData: SalesDataService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.salesData.getOrders(this.page, this.limit)
      .subscribe(response => {
        this.orders = response['page']['data'];
        this.total = response['page'].total;
        this.loading = false;
      });
  }

  goToPrevious(): void {
    this.page--;
    this.getOrders();
  }

  goToNext(): void {
    this.page++;
    this.getOrders();
  }

  goToPage(n: number): void {
    this.page = n;
    this.getOrders();
  }
}
