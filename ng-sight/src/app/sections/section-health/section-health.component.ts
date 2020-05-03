import { Component, OnInit, OnDestroy } from '@angular/core';
import { Server } from 'src/app/models/server';
import { ServerService } from 'src/app/services/server.service';
import { Observable, timer } from 'rxjs';
import { first } from 'rxjs/operators/first';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { ServerMessage } from 'src/app/models/server-message';

@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.css']
})
export class SectionHealthComponent implements OnInit, OnDestroy {

  servers: Server[];
  timerSubscription: AnonymousSubscription;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.refreshData();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  refreshData() {
    this.serverService.getServers().subscribe(response => {
      this.servers = response;
    });
    this.subscribeToData();
  }

  subscribeToData() {
    this.timerSubscription = timer(1000, 5000).pipe(first())
      .subscribe(() => this.refreshData());
  }

  sendMessage(msg: ServerMessage) {
    this.serverService.handleServerMessage(msg)
      .subscribe(
        // response => console.log('SectionHealth::sendMessage()::Message sent to the server:', msg),
        error => error != null ? console.log('SectionHealth::sendMessage()::Error:', error) : null
      );
  }
}
