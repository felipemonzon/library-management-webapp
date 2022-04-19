import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectConfig } from '@ng-select/ng-select';
import { title } from 'process';
import { PreviewFileComponent } from 'src/app/components/preview-file/preview-file.component';
import { Author } from 'src/app/models/library/author.model';
import { AuthorResponse } from 'src/app/models/library/author.response';
import { Genre } from 'src/app/models/library/genre.model';
import { GenreResponse } from 'src/app/models/library/genre.response.model';
import { Publisher } from 'src/app/models/library/publisher.model';
import { PublisherResponse } from 'src/app/models/library/publisher.response';
import { AuthorService } from 'src/app/services/library/authors.service';
import { GenreService } from 'src/app/services/library/genres.service';
import { PublisherService } from 'src/app/services/library/publisher.service';

@Component({
  selector: 'app-books-register',
  templateUrl: './books-register.component.html',
  styles: [
  ]
})
export class BooksRegisterComponent implements OnInit {
  imageSrc: string = "";
  uploadForm: FormGroup = new FormGroup({});
  info: string = "";
  size: number = 0;
  type: string = "";
  url: string = 'data:application/pdf;base64,';
  urlSafe!: SafeResourceUrl;
  authors: Author[] = [];
  publishers: Publisher[] = [];
  genres: Genre[] = [];

  constructor(private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private selectConfig: NgSelectConfig,
    private authorService: AuthorService,
    private publisherService: PublisherService,
    private genreService: GenreService) {
  }

  ngOnInit(): void {
    this.selectConfig.appendTo = "body";
    this.selectConfig.notFoundText = "No se Encontaron elementos";
    this.authorService.getAllAuthors().subscribe((response: AuthorResponse) => {
      this.authors = response.authors;
    });
    this.publisherService.getAllPublishers().subscribe((response: PublisherResponse) => {
      this.publishers = response.publishers;
    });
    this.genreService.getAllGenres().subscribe((response: GenreResponse) => {
      this.genres = response.genres;
    });

  }

  showPreview(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      console.log(file);

      reader.onload = () => {
        this.info = file.name;
        this.size = file.size;
        this.type = file.type;

        this.imageSrc = reader.result as string;
        this.url = `${this.url}${reader.result}#page=1&view=FitH&zoom=scale&pagemode=thumbs&scrollbar=1`;
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

        this.uploadForm.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

  /**
   * Abre la ventana modal.
   */
  openModal() {
    this.createModal(this.info, this.urlSafe);
  }

  /**
   * Genera el componente modal.
   *
   * @param title titulo de la modal
   * @param content contenido a mostrar
   */
  private createModal(title: string, content: any) {
    const modalRef = this.modalService.open(PreviewFileComponent, {
      size: "lg",
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.data = content;
    modalRef.componentInstance.page = this.imageSrc;
    modalRef.componentInstance.type = this.type;
  }
}
