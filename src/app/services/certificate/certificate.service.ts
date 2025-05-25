import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Certificate } from '../../models/certificate.model';
import { CertificateType } from '../../models/certificate-type.model';
import certificateData from './certificates.json';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private certificates: Certificate[] = certificateData;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Certificate[]> {
    return of(this.certificates);
  }

  getById(id: number): Observable<Certificate | undefined> {
    const certificate = this.certificates.find(c => c.id === id);
    return of(certificate);
  }

  getByTypeId(typeId: number): Observable<Certificate[]> {
    return of(this.certificates.filter(cert => cert.typeId === typeId));
  }

  create(certificate: Omit<Certificate, 'id'>): Observable<Certificate> {
    const newCertificate = {
      ...certificate,
      id: Math.max(...this.certificates.map(c => c.id)) + 1
    };
    this.certificates.push(newCertificate);
    return of(newCertificate);
  }

  update(id: number, certificate: Certificate): Observable<Certificate> {
    const index = this.certificates.findIndex(c => c.id === id);
    if (index !== -1) {
      this.certificates[index] = certificate;
      return of(certificate);
    }
    throw new Error('Certificate not found');
  }

  delete(id: number): Observable<void> {
    const index = this.certificates.findIndex(c => c.id === id);
    if (index !== -1) {
      this.certificates.splice(index, 1);
      return of(void 0);
    }
    throw new Error('Certificate not found');
  }
}
