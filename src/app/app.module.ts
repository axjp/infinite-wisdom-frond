import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewsModule } from './pages/reviews/reviews.module';
import { ProtectedComponent } from './pages/protected/protected.component';
import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { MainComponent } from './pages/main/main.component';
<<<<<<< HEAD
import { CustomerModule } from './pages/customer/customer.module';
=======
import { PdfViewerModule } from 'ng2-pdf-viewer';
>>>>>>> c34f5421961d80ec7d50ff6b2700e32ba6e1810f


@NgModule({
  declarations: [
    AppComponent,
    ProtectedComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
  ],
  imports: [
    PdfViewerModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ReviewsModule,
    AuthModule,
    CustomerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
