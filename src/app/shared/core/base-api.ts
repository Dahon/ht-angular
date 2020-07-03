import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BaseApi {

    public static API_URL = 'https://ht.kz/test/';

    constructor(public http: HttpClient) {}

    private getUrl(url: string = ''): string {
        return BaseApi.API_URL + url;
    }

    public get(url: string = ''): Observable<any> {
        return this.http.get(this.getUrl(url))
    }

    public post(url: string = '', data: any = {}): Observable<any> {
        return this.http.get(this.getUrl(url), data)
    } 



}