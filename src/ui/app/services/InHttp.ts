import { Injectable } from 'angular2/core';
import { Http, Headers, RequestOptionsArgs } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InHttp {
  private http: Http;
  private baseUrl: string = '/api';

  constructor(http: Http) {
    this.http = http;
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Object> {
    return this.http.get(this.baseUrl + url, options)
      .map(data => data.json());
  }

  public put(url: string, body: Array<any>|Object, options?: RequestOptionsArgs): Observable<Object> {
    options = InHttp.addHeaders(options);

    return this.http.put(this.baseUrl + url, InHttp.stringifyBody(body), options)
      .map(data => data.json());
  }

  public post(url: string, body: Array<any>|Object, options?: RequestOptionsArgs): Observable<Object> {
    options = InHttp.addHeaders(options);

    return this.http.post(this.baseUrl + url, InHttp.stringifyBody(body), options)
      .map(data => data.json());
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Object> {
    return this.http.delete(this.baseUrl + url, options);
  }

  private static addHeaders(options?: RequestOptionsArgs) {
    if (options) {
      if (options.headers) {
        if (!options.headers.has('Content-Type')) {
          options.headers.append('Content-Type', 'application/json');
        }
      } else {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        options.headers = headers;
      }
    } else {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');

      options = {
        headers: headers
      };
    }

    return options;
  }

  private static stringifyBody(body: Array<any>|Object): string {
    return JSON.stringify(body);
  }
}
