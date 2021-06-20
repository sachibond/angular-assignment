import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Server, ServerPayloadInput } from '../interfaces/server.interface';
import { SERVER_URL } from '../constant/serverConstant';

const arr = [0, 250, 500];

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private _http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getServerDetail(): Observable<Server> {
    return this._http
      .get<Server>(SERVER_URL)
      .pipe(catchError(this.handleError));
  }
  getFilterServerDetail(data: ServerPayloadInput): Observable<Server> {
    let httpParams = new HttpParams();
    if (data.sliderControl[1] != 0) {
      const min = arr.includes(data.sliderControl[0])
        ? data.sliderControl[0]
        : data.sliderControl[0] * 1000;
      httpParams = httpParams.append('storageMin', min.toString());
      const max = arr.includes(data.sliderControl[1])
        ? data.sliderControl[1]
        : data.sliderControl[1] * 1000;
      httpParams = httpParams.append('storageMax', max.toString());
    }
    if (data.ramChoice.length > 0) {
      httpParams = httpParams.append('ram', data.ramChoice.join(','));
    }
    if (data.hddChoice && data.hddChoice.length > 0) {
      httpParams = httpParams.append('hdd', data.hddChoice.join(','));
    }
    if (data.locationChoice && data.locationChoice.length > 0) {
      httpParams = httpParams.append('location', data.locationChoice.join(','));
    }

    return this._http
      .get<Server>(SERVER_URL, { params: httpParams })
      .pipe(catchError(this.handleError));
  }
}
