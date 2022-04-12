import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Author } from 'src/app/models/library/author.model';
import { AuthorService } from 'src/app/services/library/authors.service';

@Component({
  selector: 'app-author-register',
  templateUrl: './author-register.component.html',
  styles: [
  ]
})
export class AuthorRegisterComponent implements OnInit {
  @ViewChild("firstName", { static: true })
  public firstName!: ElementRef;
  @Input() data: any;
  author!: Author;
  isValid: boolean = false;
  isUpdate: boolean = false;
  frmAuthor: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private authorService: AuthorService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.isUpdate = true;
      this.updateData(this.data);
    } else {
      this.createNewForm();
    }
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.frmAuthor.controls;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.firstName.nativeElement.focus();
    }, 100);
  }

  save() {
    if (!this.frmAuthor.invalid) {
      this.author = this.frmAuthor.value;      
      this.isUpdate
      ? this.authorService.update(this.author)
      : this.authorService.create(this.author);
    } else {
      this.isValid = true;
    }
  }

  /**
   * Construye un formulario nuevo.
   */
  private createNewForm() {
    this.frmAuthor = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
    });
  }

  /**
   * Llena el formulario para actualizar los datos.
   *
   * @param author datos del autor
   */
  private updateData(author: Author) {
    this.frmAuthor = this.formBuilder.group({
      id: [author.id],
      firstName: [author.firstName, [Validators.required]],
      lastName: [author.lastName, [Validators.required]],
    });
  }
}
