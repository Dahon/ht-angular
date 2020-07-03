import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search-services.service';
import { ITour } from '../../shared/models/ITours.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  tours: ITour[] = [];
  preload: boolean = false;
  footerList: any[] = [
    { id: 1, img: '../../../assets/img/search-icon.png', title: 'Поиск', text: 'по отелю' },
    { id: 2, img: '../../../assets/img/filtr.png', title: 'Фильтры', text: 'не выбранно' },
    { id: 3, img: '../../../assets/img/sort.png', title: 'Сортировка', text: 'сначала дешевле' }
  ]

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.subscription.add(this.searchService.tours
      .subscribe((tours: ITour[]) => {
        this.tours = tours.sort((a, b) => a.price - b.price);
        this.preload = false;
      }));
    this.subscription.add(this.searchService.preload
      .subscribe((value: boolean) => {
        this.preload = value;
    }));
  }

  identify(index, item){
    return item.index; 
  }

  ngOnDestroy() {
    this.searchService.setTours([]);
    this.searchService.setPreload(false);
    this.subscription.unsubscribe();
  }

}
