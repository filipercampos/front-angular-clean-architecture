import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { IDialogController } from 'src/app/domain/interfaces/idialog-controller';
import { DocumentEntity } from '../../../../../domain/entities/document-entity';
import { DriverEntity } from '../../../../../domain/entities/driver-entity';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'app-dialog-register',
  templateUrl: './dialog-register.component.html',
  styleUrls: ['./dialog-register.component.scss'],
})
export class DialogRegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  documents!: FormArray;
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DriverEntity,
    private usecaseController: IDialogController,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogRegisterComponent>,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      id: [this.data ? this.data.id : ''],
      name: [this.data ? this.data.name : '', Validators.required],
      birth_date: [this.data ? this.data.birth_date : '', Validators.required],
      phone: [this.data ? this.data.phone : '', Validators.required],
      documents: this.data ? this.fb.array([]) : this.fb.array([this.createDocument()]),
    });

    if (this.data) {
      this.addDocuments(this.data.documents);
    }
  }

  get docsControlView() {
    const docControls = this.form.get('documents') as FormArray;
    return docControls.controls;
  }

  createDocument(document?: DocumentEntity): FormGroup {
    return this.fb.group({
      number: [document ? document.number : '', Validators.required],
      category: document ? document.category : '',
      doc_type: [document ? document.doc_type : '', Validators.required],
      add_document: document ? true : false,
    });
  }

  addDocuments(documents: DocumentEntity[]) {
    documents.forEach((item) => {
      this.documents = this.form.get('documents') as FormArray;
      this.documents.push(this.createDocument(item));
    });
  }

  addNewDocument(item: FormControl): void {
    item.get('add_document')?.setValue(true);

    this.documents = this.form.get('documents') as FormArray;
    this.documents.push(this.createDocument());
  }

  removeDocument(item: FormControl, index: number): void {
    this.documents.controls.splice(index, 1);
    this.documents.value.splice(index, 1);

    if (this.documents.value.length === 0) {
      this.documents = this.form.get('documents') as FormArray;
      this.documents.push(this.createDocument());
    }
  }

  save() {
    this.isLoading = true;
    this.data ? this.update() : this.insert();
  }

  update() {
    this.usecaseController
      .update(this.form.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (driver: DriverEntity) => this.dialogRef.close(driver),
        error: (err) => this.notification.showError(err),
      });
  }

  insert() {
    this.usecaseController
      .insert(this.form.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (driver: DriverEntity) => this.dialogRef.close(driver),
        error: (err: any) => this.notification.showError(err),
      });
  }
}
