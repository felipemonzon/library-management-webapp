import { HttpClient, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Publisher } from "src/app/models/library/publisher.model";
import { PublisherResponse } from "src/app/models/library/publisher.response";
import { MessagesConstant } from "src/app/utils/messages-constants";
import { MessagingNotification } from "src/app/utils/messaging-notification";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class PublisherService {
    /**
     * Ruta de la API de editoriales.
     */
    private publisherPath = `${environment.baseUrl}${environment.publishers}`;
    /**
     * Ruta de la API de consulta las editoriales.
     */
    private publisherRetrievePath = `${environment.baseUrl}${environment.publishers}${environment.retrieve}`;
    /**
     * Ruta de la API de registro de editoriales.
     */
    private publisherRegisterPath = `${environment.baseUrl}${environment.publishers}${environment.create}`;

    /** Constructor */
    constructor(private httpClient: HttpClient) { }

    /**
     * Consulta todas las editoriales.
     */
    public getAllPublishers() {
        return this.httpClient.get<PublisherResponse>(this.publisherRetrievePath);
    }

    /**
     * Guarda los datos de una editorial.
     * 
     * @param publisher datos de la editorial
     */
    public create(publisher: Publisher) {
        return this.httpClient.post<HttpResponse<any>>(this.publisherRegisterPath, publisher, {
            observe: "response",
        }).subscribe((response: HttpResponse<any>) => {
            if (response.status === HttpStatusCode.Created) {
                MessagingNotification.reaload(
                    MessagingNotification.SUCCESS_TYPE,
                    MessagesConstant.SUCCESS_TITLE,
                    MessagesConstant.SAVE_SUCCESS
                );
            } else {
                MessagingNotification.create(
                    MessagingNotification.WARNING_TYPE,
                    response.body.code as string,
                    response.body.message as string
                );
            }
        });
    }

    update(publisher: Publisher) {
        return this.httpClient
            .put<HttpResponse<any>>(this.publisherPath + "/" + publisher.id, publisher, {
                observe: "response",
            })
            .subscribe((response: HttpResponse<any>) => {
                if (response.status === HttpStatusCode.NoContent) {
                    MessagingNotification.reaload(
                        MessagingNotification.SUCCESS_TYPE,
                        MessagesConstant.SUCCESS_TITLE,
                        MessagesConstant.UPDATE_SUCCESS
                    );
                } else {
                    MessagingNotification.create(
                        MessagingNotification.WARNING_TYPE,
                        response.body.code as string,
                        response.body.message as string
                    );
                }
            });
    }
}
