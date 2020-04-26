import { Component, OnInit, Input } from '@angular/core';
import { Server } from 'src/app/models/server';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  constructor() { }

  color: string;
  buttonText: string;

  @Input() serverInput: Server;

  ngOnInit() {
    this.setServerStatus(this.serverInput.isOnline);
  }

  setServerStatus(serverStatus: boolean) {
    if (serverStatus) {
      this.serverInput.isOnline = true;
      this.color = '#66BB6A';
      this.buttonText = 'Shut Down';
    } else {
      this.serverInput.isOnline = false;
      this.color = '#FF6B6B';
      this.buttonText = 'Start';
    }
  }

  toggleStatus(serverStatus: boolean) {
    console.log(this.serverInput.name + ': ' + serverStatus);
    this.setServerStatus(!this.serverInput.isOnline);
  }

}
