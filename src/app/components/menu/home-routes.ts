import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/configs/auth.guard';
import { AuthorRetrieveComponent } from 'src/app/modules/authors/author-retrieve/author-retrieve.component';
import { BooksRegisterComponent } from 'src/app/modules/books/books-register/books-register.component';
import { BooksRetrieveComponent } from 'src/app/modules/books/books-retrieve/books-retrieve.component';
import { PublisherRegisterComponent } from 'src/app/modules/publishers/publisher-register/publisher-register.component';
import { PublisherRetrieveComponent } from 'src/app/modules/publishers/publisher-retrieve/publisher-retrieve.component';

export const HomeRoutes: Routes = [
    { path: '', component: AuthorRetrieveComponent, canActivate: [AuthGuard] },
    { path: 'authors', component: AuthorRetrieveComponent, canActivate: [AuthGuard] },
    { path: 'publishers/retrieve', component: PublisherRetrieveComponent, canActivate: [AuthGuard] },
    { path: 'publishers/create', component: PublisherRegisterComponent, canActivate: [AuthGuard] },
    { path: 'books/retrieve', component: BooksRetrieveComponent, canActivate: [AuthGuard] },
    { path: 'books/create', component: BooksRegisterComponent, canActivate: [AuthGuard] }
];
