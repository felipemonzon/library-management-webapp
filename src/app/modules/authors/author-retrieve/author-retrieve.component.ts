import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Author } from 'src/app/models/library/author.model';
import { AuthorResponse } from 'src/app/models/library/author.response';
import { AuthorService } from 'src/app/services/library/authors.service';
import { AuthorRegisterComponent } from '../author-register/author-register.component';

@Component({
  selector: 'app-author-retrieve',
  templateUrl: './author-retrieve.component.html',
  styles: [
  ]
})
export class AuthorRetrieveComponent implements OnInit {
  authors: Author[] = [];
  pageSize = 10;
  page: number = 1;

  /**
   * Constructor de la clase.
   * 
   * @param modalService servicio mdoal
   * @param authorService servicio de autores
   * @param formBuilder constructor de formulario
   */
  constructor(
    private modalService: NgbModal,
    private authorService: AuthorService,
    private formBuilder: FormBuilder) { }

  /**
   * interfaz de inicio.
   */
  ngOnInit(): void {
    this.authorService.getAllAuthors().subscribe((response: AuthorResponse) => {
      this.authors = response.authors;
      this.page = response.currentPage
    });
  }

  /**
   * Actualiza los datos de un autor.
   *
   * @param author autor a actualiza
   */
   update(author: Author) {
    this.createModal("Actualizar Autor", author);
  } 

  /**
   * Abre la ventana modal.
   */
  openModal() {
    this.createModal("Registrar Autor");
  }

  /**
   * Genera el componente modal.
   *
   * @param title titulo de la modal
   * @param author author a editar, nulo si es para registrar
   */
  private createModal(title: string, author?: Author) {
    const modalRef = this.modalService.open(ModalComponent, {
      size: "lg",
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.page = AuthorRegisterComponent;
    modalRef.componentInstance.data = author;
  }

}
