import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CertificateType } from '../../models/certificate-type.model';
import certificateTypeData from './certificate-type.json';

@Injectable({
  providedIn: 'root'
})
export class CertificateTypeService {
  private certificateTypes: CertificateType[] = certificateTypeData;

  constructor(private http: HttpClient) {}

  getAll(): Observable<CertificateType[]> {
    return of(this.certificateTypes);
  }

  getById(id: number): Observable<CertificateType | undefined> {
    const certificateType = this.certificateTypes.find(ct => ct.id === id);
    return of(certificateType);
  }

  create(certificateType: Omit<CertificateType, 'id'>): Observable<CertificateType> {
    const newCertificateType = {
      ...certificateType,
      id: Math.max(...this.certificateTypes.map(ct => ct.id)) + 1
    };
    this.certificateTypes.push(newCertificateType);
    return of(newCertificateType);
  }

  update(id: number, certificateType: CertificateType): Observable<CertificateType> {
    const index = this.certificateTypes.findIndex(ct => ct.id === id);
    if (index !== -1) {
      this.certificateTypes[index] = certificateType;
      return of(certificateType);
    }
    throw new Error('Certificate type not found');
  }

  delete(id: number): Observable<void> {
    const index = this.certificateTypes.findIndex(ct => ct.id === id);
    if (index !== -1) {
      this.certificateTypes.splice(index, 1);
      return of(void 0);
    }
    throw new Error('Certificate type not found');
  }

  addType(certType: CertificateType) {

  }
}
