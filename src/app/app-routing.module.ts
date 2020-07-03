import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { SearchPageComponent } from './pages/search-page/search-page.component';

const routes: Routes = [
    { path: '', redirectTo: '/search', pathMatch: 'full'},
    { path: 'search', component: SearchPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }