import { HttpClient, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Genre } from "src/app/models/library/genre.model";
import { GenreResponse } from "src/app/models/library/genre.response.model";
import { MessagesConstant } from "src/app/utils/messages-constants";
import { MessagingNotification } from "src/app/utils/messaging-notification";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class GenreService {
  /**
   * Ruta de la API de géneros.
   */
  private genrePath = `${environment.baseUrl}${environment.genres}`;
  /**
   * Ruta de la API de consulta de géneros.
   */
  private genreRetrievePath = `${environment.baseUrl}${environment.genres}${environment.retrieve}`;
  /**
   * Ruta de la API de registro de géneros.
   */
  private genreRegisterPath = `${environment.baseUrl}${environment.genres}${environment.create}`;

  /** Constructor */
  constructor(private httpClient: HttpClient) { }

  /**
   * Consulta todas los géneros.
   */
  public getAllGenres() {
    return this.httpClient.get<GenreResponse>(this.genreRetrievePath);
  }

  /**
   * Guarda los datos de un género.
   * 
   * @param genre datos del género
   */
  public create(genre: Genre) {
    return this.httpClient.post<HttpResponse<any>>(this.genreRegisterPath, genre, {
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

  update(genre: Genre) {
    return this.httpClient
      .put<HttpResponse<any>>(this.genrePath + "/" + genre.id, genre, {
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
