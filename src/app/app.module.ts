import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
<<<<<<< HEAD
import { AdministratorModule } from './pages/administrator/administrator.module';
=======
import { LoginComponent } from './pages/login/login/login.component';
>>>>>>> 4ccf2d8432d6b75864fcab668698a3251241a1ee


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
<<<<<<< HEAD
    AdministratorModule
    
=======

>>>>>>> 4ccf2d8432d6b75864fcab668698a3251241a1ee
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
