import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BaseApi } from '../shared/core/base-api';
import {map} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ITour } from '../shared/models/ITours.interface';


@Injectable({
  providedIn: 'root'
})
export class SearchService extends BaseApi{

  public tours = new BehaviorSubject<ITour[]>([]);
  public preload = new BehaviorSubject<boolean>(false);

	constructor(public http: HttpClient) {
    super(http)
  }

  public setTours(data: ITour[]): void {
    this.tours.next(data);
  }

  public setPreload(value: boolean): void {
    this.preload.next(value);
  }
  
  public getTours(): ITour[] {
    return this.tours.getValue();
  }

	search(obj) {
    var str = Object.keys(obj).map(function(key) {
      return key + '=' + obj[key];
    }).join('&');
    return this.get(`searchPartner1?${str}`);
	}
}
