import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  private _url = 'http://localhost:3000/devices/refresh';

  constructor(private http: HttpClient) { }
  refresh() {
    this.http.get(this._url).subscribe(res => {
      // let devices = res.body.devices;
    }, error => {

    });

  }
}
