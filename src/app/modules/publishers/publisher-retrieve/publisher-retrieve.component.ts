import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Publisher } from 'src/app/models/library/publisher.model';
import { PublisherResponse } from 'src/app/models/library/publisher.response';
import { PublisherService } from 'src/app/services/library/publisher.service';
import { PublisherRegisterComponent } from '../publisher-register/publisher-register.component';

@Component({
  selector: 'app-publisher-retrieve',
  templateUrl: './publisher-retrieve.component.html',
  styles: [
  ]
})
export class PublisherRetrieveComponent implements OnInit {
  publishers: Publisher[] = [];
  pageSize = 10;
  page: number = 1;

  /**
   * Constructor de la clase.
   * 
   * @param modalService servicio mdoal
   * @param authorService servicio de editoriales
   * @param formBuilder constructor de formulario
   */
  constructor(
    private modalService: NgbModal,
    private publisherService: PublisherService,
    private formBuilder: FormBuilder) { }

  /**
   * interfaz de inicio.
   */
  ngOnInit(): void {
    this.publisherService.getAllPublishers().subscribe((response: PublisherResponse) => {
      this.publishers = response.publishers;      
      this.page = response.currentPage
    });
  }

  /**
   * Actualiza los datos de una editorial.
   *
   * @param publishers editorial a actualizar
   */
   update(publishers: Publisher) {
    this.createModal("Actualizar Editorial", publishers);
  } 

  /**
   * Abre la ventana modal.
   */
  openModal() {
    this.createModal("Registrar Editorial");
  }

  /**
   * Genera el componente modal.
   *
   * @param title titulo de la modal
   * @param publisher editorial a editar, nulo si es para registrar
   */
  private createModal(title: string, publisher?: Publisher) {
    const modalRef = this.modalService.open(ModalComponent, {
      size: "lg",
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.page = PublisherRegisterComponent;
    modalRef.componentInstance.data = publisher;
  }
}
