import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule }   from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchCardComponent } from './components/search-card/search-card.component';
import { SearchService } from './services/search-services.service';
import { FieldErrorDisplayComponent } from './shared/components/field-error-display/field-error-display.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    SearchFormComponent,
    SearchCardComponent,
    FieldErrorDisplayComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule 
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
