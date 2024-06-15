import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdministratorModule } from './pages/administrator/administrator.module';


@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
   
    NgbModule,
    AdministratorModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
