import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from "ngx-ui-loader";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './interceptors/HttpInterceptorService';
import { LoginComponent } from './modules/users/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpErrorInterceptor } from './interceptors/HttpErrorInterceptor';
import { AuthorRegisterComponent } from './modules/authors/author-register/author-register.component';
import { AuthorRetrieveComponent } from './modules/authors/author-retrieve/author-retrieve.component';
import { LetterOnlyeDirective } from './directives/letter-only.directive';
import { LetterNumberOnlyDirective } from './directives/letter-number-only.directive';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { PublisherRetrieveComponent } from './modules/publishers/publisher-retrieve/publisher-retrieve.component';
import { PublisherRegisterComponent } from './modules/publishers/publisher-register/publisher-register.component';
import { BooksRetrieveComponent } from './modules/books/books-retrieve/books-retrieve.component';
import { BooksRegisterComponent } from './modules/books/books-register/books-register.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PreviewFileComponent } from './components/preview-file/preview-file.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    LetterOnlyeDirective,
    NumberOnlyDirective,
    LetterNumberOnlyDirective,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    MenuComponent,
    LoginComponent,
    AuthorRegisterComponent,
    AuthorRetrieveComponent,
    PublisherRetrieveComponent,
    PublisherRegisterComponent,
    BooksRetrieveComponent,
    BooksRegisterComponent,
    PreviewFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule,
    NgSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
