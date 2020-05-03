import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Server } from '../models/server';
import { ServerMessage } from '../models/server-message';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  options = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'q=0,8;application/json;q=0.9')
  };

  getServers(): Observable<Server[]> {
    return this.http.get<Server[]>('http://localhost:5000/api/server')
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? '${error.status} - ${error.statusText}' : 'Server error!';
    console.log('ServerService::handleError():', errMsg);
    return throwError(errMsg);
  }

  handleServerMessage(msg: ServerMessage): Observable<Response> {
    const url = 'http://localhost:5000/api/server/' + msg.id;
    return this.http.put<Response>(url, msg, this.options);
  }
}
