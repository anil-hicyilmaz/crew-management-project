import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { CertificateService } from '../../services/certificate/certificate.service';
import { CertificateTypeService } from '../../services/certificate-type/certificate-type.service';
import { Certificate } from '../../models/certificate.model';
import { CertificateType } from '../../models/certificate-type.model';

@Component({
  selector: 'app-crew-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    TranslateModule
  ],
  templateUrl: './crew-form-modal.component.html',
  styleUrls: ['./crew-form-modal.component.css']
})
export class CrewFormModalComponent {
  crewForm: FormGroup;
  certificates: Certificate[] = [];
  certificateTypes: CertificateType[] = [];

  titles = [
    'Captain',
    'Chief Officer',
    'Second Officer',
    'Third Officer',
    'Chief Engineer',
    'Second Engineer',
    'Third Engineer',
    'Electrician',
    'Bosun',
    'Able Seaman',
    'Ordinary Seaman',
    'Cook',
    'Steward'
  ];

  nationalities = [
    'USA',
    'UK',
    'Germany',
    'France',
    'Spain',
    'Italy',
    'Greece',
    'Turkey',
    'Philippines',
    'India',
    'China',
    'Japan',
    'South Korea',
    'Australia',
    'Canada'
  ];

  currencies = [
    'USD',
    'EUR',
    'GBP',
    'JPY',
    'AUD',
    'CAD',
    'CHF',
    'CNY',
    'INR',
    'KRW',
    'SGD',
    'TRY'
  ];

  constructor(
    private dialogRef: MatDialogRef<CrewFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private certificateService: CertificateService,
    private certificateTypeService: CertificateTypeService
  ) {
    this.crewForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationality: ['', Validators.required],
      title: ['', Validators.required],
      daysOnBoard: [0, [Validators.required, Validators.min(0)]],
      dailyRate: [0, [Validators.required, Validators.min(0)]],
      currency: ['USD', Validators.required],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      certificateIds: [[]]
    });

    if (data) {
      this.crewForm.patchValue(data);
    }

    // Load certificates and certificate types
    this.certificateService.getAll().subscribe(certs => {
      console.log(certs)
      this.certificates = certs;
    });

    this.certificateTypeService.getAll().subscribe(types => {
      this.certificateTypes = types;
    });
  }

  getCertificateTypeName(typeId: number): string {
    const type = this.certificateTypes.find(t => t.id === typeId);
    return type ? type.name : 'Unknown';
  }

  save(): void {
    if (this.crewForm.valid) {
      this.dialogRef.close(this.crewForm.value);
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
