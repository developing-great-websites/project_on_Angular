import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {RequestsService} from "../../services/requests.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {RequestDataType} from "../../../../types/request-data.type";
import {RequestTypeEnum} from "../../../../types/request-type.enum";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  requestForm = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  });

  isSuccess: boolean = false;
  isService: boolean = false;
  isError: boolean = false;
  categoryData: string = '';

  modalTitle: string | null = null;
  modalButton: string | null = null;

  get name() {
    return this.requestForm.get('name');
  }

  get phone() {
    return this.requestForm.get('phone');
  }

  get category() {
    return this.requestForm.get('category');
  }

  constructor(private fb: FormBuilder,
              public dialogRef: DialogRef<string>,
              private requestsService: RequestsService,
              private _snackBar: MatSnackBar,
              @Inject(DIALOG_DATA) private data: string) {
  }

  ngOnInit(): void {
    if (this.data && this.data === 'callMe') {
      this.isService = false;
      this.modalTitle = 'Закажите бесплатную консультацию!';
      this.modalButton = 'Заказать консультацию';
    } else if (this.data) {
      this.isService = true;
      this.modalTitle = 'Заявка на услугу';
      this.modalButton = 'Оставить заявку';
      (this.requestForm as FormGroup).addControl("category", new FormControl('', Validators.required));
      (this.requestForm as FormGroup).controls['category'].setValue(this.data);
      (this.requestForm as FormGroup).value.category = this.data;
      this.categoryData = this.data;
    }
  }

  request(): void {
    if (this.requestForm.value.name && this.requestForm.value.phone) {
      let requestData: RequestDataType = {
        name: this.requestForm.value.name,
        phone: this.requestForm.value.phone,
        type: this.isService ? RequestTypeEnum.order : RequestTypeEnum.consultation
      }
      if (this.isService && this.categoryData) {
        requestData = {...requestData, service: this.categoryData};
      }

      this.requestsService.requestForService(requestData)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (data.error) {
              this.isError = true;
              throw new Error(data.message);
            }
            this.isSuccess = true;
          }
        });
    }
  }
}
