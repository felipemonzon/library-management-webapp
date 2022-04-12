import { Routes } from '@angular/router';
import { AuthorRetrieveComponent } from 'src/app/modules/authors/author-retrieve/author-retrieve.component';

export const HomeRoutes: Routes = [
    { path: '', component: AuthorRetrieveComponent },
    { path: 'authors', component: AuthorRetrieveComponent}
];
