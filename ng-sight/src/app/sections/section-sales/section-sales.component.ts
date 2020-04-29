import { Component, OnInit } from '@angular/core';
import { SalesDataService } from 'src/app/services/sales-data.service';

@Component({
  selector: 'app-section-sales',
  templateUrl: './section-sales.component.html',
  styleUrls: ['./section-sales.component.css']
})
export class SectionSalesComponent implements OnInit {

  salesDataByCustomer: any;
  salesDataByState: any;

  constructor(private salesData: SalesDataService) { }

  ngOnInit() {
    this.salesData.getOrdersByState().subscribe(response => {
      this.salesDataByState = response;
    });

    this.salesData.getOrdersByCustomer(5).subscribe(response => {
      this.salesDataByCustomer = response;
    });
  }

}
