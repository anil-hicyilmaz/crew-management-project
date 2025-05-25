import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Certificate } from 'src/app/models/certificate.model';
import { CertificateType } from 'src/app/models/certificate-type.model';
import { MatCardModule } from '@angular/material/card';
import { CertificateService } from 'src/app/services/certificate/certificate.service';

@Component({
  selector: 'app-crew-certificates-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule],
  templateUrl: './crew-certificates-modal.component.html',
  styleUrls: ['./crew-certificates-modal.component.css']
})
export class CrewCertificatesModalComponent {
  public certificates: Certificate[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { certificateIds: number[] },
    private certificateService: CertificateService
  ) {}

  getCertificates() {
    let tempCertificates: Certificate[] = []

    if (!this.data.certificateIds.length) {
      for (let id of this.data.certificateIds) {
        this.certificateService.getById(id).subscribe(cert => {
          tempCertificates.push(cert!);
        })
      }
    }

    this.certificates = tempCertificates;
  }
}
