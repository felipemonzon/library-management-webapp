import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-preview-file',
  templateUrl: './preview-file.component.html',
  styles: [
  ]
})
export class PreviewFileComponent implements OnInit {
  @Input() title: string = '';
  @Input() page: any;
  @Input() data: any;
  @Input() type: string = "";

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
