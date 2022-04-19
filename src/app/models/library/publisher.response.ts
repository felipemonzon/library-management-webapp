import { Pagination } from "../shared/pagination.model";
import { Publisher } from "./publisher.model";

export interface PublisherResponse extends Pagination {
    publishers: Publisher[];
}