import { HttpClient, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Author } from "src/app/models/library/author.model";
import { AuthorResponse } from "src/app/models/library/author.response";
import { MessagesConstant } from "src/app/utils/messages-constants";
import { MessagingNotification } from "src/app/utils/messaging-notification";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthorService {
  /**
   * Ruta de la API de autores.
   */
   private authorPath = `${environment.baseUrl}${environment.authors}`;  
  /**
   * Ruta de la API de consulta de autores.
   */
  private authorRetrievePath = `${environment.baseUrl}${environment.authors}${environment.retrieve}`;
  /**
   * Ruta de la API de registro de autores.
   */
  private authorRegisterPath = `${environment.baseUrl}${environment.authors}${environment.create}`;

  /** Constructor */
  constructor(private httpClient: HttpClient) { }

  /**
   * Consulta todas los autores.
   */
  public getAllAuthors() {
    return this.httpClient.get<AuthorResponse>(this.authorRetrievePath);
  }

  /**
   * Guarda los datos de un autor.
   * 
   * @param author datos del author
   */
  public create(author: Author) {
    return this.httpClient.post<HttpResponse<any>>(this.authorRegisterPath, author, {
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

  update(author: Author) {
    return this.httpClient
      .put<HttpResponse<any>>(this.authorPath + "/" + author.id, author, {
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
