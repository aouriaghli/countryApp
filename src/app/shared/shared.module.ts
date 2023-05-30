import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { SearchboxComponent } from './components/search-box/search-box.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';




@NgModule({
  declarations: [
    AboutPageComponent,
    ContactPageComponent,
    HomePageComponent,
    LoadingSpinnerComponent,
    SearchboxComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    AboutPageComponent,
    ContactPageComponent,
    HomePageComponent,
    LoadingSpinnerComponent,
    SearchboxComponent,
    SidebarComponent,

  ]
})
export class SharedModule { }
