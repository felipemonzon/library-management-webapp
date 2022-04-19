import { Author } from 'src/app/models/library/author.model';
import { Pagination } from 'src/app/models/shared/pagination.model';

export interface AuthorResponse extends Pagination {
    authors: Author[];
}