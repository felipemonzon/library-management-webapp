import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Author } from 'src/app/models/library/author.model';
import { Publisher } from 'src/app/models/library/publisher.model';
import { PublisherService } from 'src/app/services/library/publisher.service';

@Component({
  selector: 'app-publisher-register',
  templateUrl: './publisher-register.component.html',
  styles: [
  ]
})
export class PublisherRegisterComponent implements OnInit {
  @ViewChild("name", { static: true })
  public name!: ElementRef;
  @Input() data: any;
  publisher!: Publisher;
  isValid: boolean = false;
  isUpdate: boolean = false;
  frmPublisher: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private publisherService: PublisherService
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
    return this.frmPublisher.controls;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.name.nativeElement.focus();
    }, 100);
  }

  save() {
    if (!this.frmPublisher.invalid) {
      this.publisher = this.frmPublisher.value;      
      this.isUpdate
      ? this.publisherService.update(this.publisher)
      : this.publisherService.create(this.publisher);
    } else {
      this.isValid = true;
    }
  }

  /**
   * Construye un formulario nuevo.
   */
  private createNewForm() {
    this.frmPublisher = this.formBuilder.group({
      name: ["", [Validators.required]]
    });
  }

  /**
   * Llena el formulario para actualizar los datos.
   *
   * @param publisher datos de la editorial
   */
  private updateData(publisher: Publisher) {
    this.frmPublisher = this.formBuilder.group({
      id: [publisher.id],
      name: [publisher.name, [Validators.required]],
    });
  }
}
