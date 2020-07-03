import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ISelect } from '../../shared/models/ISelect.interface'
import { SearchService } from '../../services/search-services.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  cities: ISelect[] = [
    { id: null, name: 'Select city'},
    { id: 10, name: 'Алматы'},
    { id: 11, name: 'Астана'},
  ];

  countries: ISelect[] = [
    { id: null, name: 'Select country'},
    { id: 552, name: 'Турция'},
    { id: 553, name: 'Тайланд'},
    { id: 554, name: 'Чехия'}
  ]


  searchForm = this._fb.group({
    departCity: [null, [Validators.required]],
    country: [null, [Validators.required]],
    date: [null, [Validators.required]],
    nights: ["",  [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(15), Validators.min(5)]],
    nightsTo: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(15), Validators.min(5), this.check]]
  });

  constructor(private _fb: FormBuilder,  private searchService: SearchService) { }

  ngOnInit(): void {
  }


  isFieldValid(field: string, errorType: string='') {

    // return this.searchForm.get(field).errors && this.searchForm.get(field).errors[errorType];

    if(errorType === 'correctError') {
      return (this.searchForm.get(field).errors && !this.searchForm.get(field).errors.min && !this.searchForm.get(field).errors.max && !this.searchForm.get(field).errors.pattern && this.searchForm.get(field).errors.correctError);
    }

    if(errorType === 'pattern') {
      return (this.searchForm.get(field).errors && !this.searchForm.get(field).errors.min && !this.searchForm.get(field).errors.max && this.searchForm.get(field).errors.pattern);
    }

    if(errorType === 'min') {
      return (this.searchForm.get(field).errors && this.searchForm.get(field).errors.min);
    }
    if(errorType === 'max') {
      return (this.searchForm.get(field).errors && this.searchForm.get(field).errors.max);
    }
    
    return !this.searchForm.get(field).valid && this.searchForm.get(field).touched && this.searchForm.get(field).value == '';

  }

  displayFieldCss(field: string) {
    return {
      'error focused': ((this.searchForm.get(field).dirty || this.searchForm.get(field).touched) && this.searchForm.get(field).errors != null)
    }
  }

  isEmpty(obj) {
    for(var key in obj) {
        if(this.hasOwnProperty(key))
            return false;
    }
    return true;
}

  check(control) {
    let parent = control.parent;
    if(parent) {
      if(parseInt(parent.value.nights) > parseInt(control.value) ) {
          return { 'correctError': true }
        } else {
          return null;
        }
    }
  }

  validateAllFormFields(searchForm: FormGroup) {         
    Object.keys(searchForm.controls).forEach(field => {  
      const control = searchForm.get(field);             
      if (control instanceof FormControl) {            
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.validateAllFormFields(control);            
      }
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.searchService.setPreload(true);
      this.subscription.add(this.searchService.search(this.searchForm.value)
          .subscribe((data) => {
            this.searchService.setTours(data['tours']);
          }));
    } else {
      this.validateAllFormFields(this.searchForm); 
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
