import { Component, OnInit, Input } from '@angular/core';
import { ITour } from 'src/app/shared/models/ITours.interface';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {
  @Input() item: ITour;
  constructor() { }

  ngOnInit(): void {
  }

}
