import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, firstValueFrom, retry } from 'rxjs';
import { API_URL } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions: Object;
  baseUrl = API_URL;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  async get<T>(params: { url: string, options?: Object }): Promise<T> {
    params.options = { ...this.httpOptions };
    console.log(params.options)
    const get = this.http.get<T>(`${this.baseUrl}${params.url}`, params.options);
    return firstValueFrom(get);
  }

  async post<T>(params: { url: string, body: Object, options?: Object }) {

    const { url, body, options } = params;

    return firstValueFrom(this.http
      .post<T>(
        this.baseUrl + url,
        JSON.stringify(body),
        this.httpOptions
      ).pipe(retry(1)));
  }

  async patch<T>(params: { url: string, body: Object, options?: Object }) {

    const { url, body, options } = params;

    return firstValueFrom(this.http
      .patch<T>(
        this.baseUrl + url,
        JSON.stringify(body),
        this.httpOptions
      ).pipe(retry(1)));
  }

  async delete(params: { url: string, options?: Object }): Promise<void> {
    params.options = { ...this.httpOptions };
    const result = this.http.delete<void>(`${this.baseUrl}${params.url}`, params.options);
    return firstValueFrom(result);
  }
}
