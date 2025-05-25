import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CertificateTypeService } from 'src/app/services/certificate-type/certificate-type.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-certificate-type',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule
  ],
  templateUrl: './certificate-type.component.html',
  styleUrls: ['./certificate-type.component.css']
})
export class CertificateTypeComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private typeService: CertificateTypeService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.typeService.addType({
        id: 999,
        name: this.form.value.name,
        description: this.form.value.description
      });
      this.form.reset();
    }
  }
}
