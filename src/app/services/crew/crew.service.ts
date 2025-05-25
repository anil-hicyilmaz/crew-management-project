import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Crew } from '../../models/crew.model';
import { Certificate } from '../../models/certificate.model';
import { CertificateType } from '../../models/certificate-type.model';
import { CertificateService } from '../certificate/certificate.service';
import { CertificateTypeService } from '../certificate-type/certificate-type.service';
import crewData from './crew.json';

@Injectable({
  providedIn: 'root'
})
export class CrewService {
  private crews: Crew[] = crewData;
  private crewsSubject = new BehaviorSubject<Crew[]>(this.crews);
  crew$ = this.crewsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private certificateService: CertificateService,
    private certificateTypeService: CertificateTypeService
  ) {}

  getAll(): Observable<Crew[]> {
    return of(this.crews);
  }

  getById(id: number): Observable<Crew | undefined> {
    const crew = this.crews.find(c => c.id === id);
    return of(crew);
  }

  getCrewById(id: number): Observable<Crew | undefined> {
    return this.getById(id);
  }

  addCrew(crew: Omit<Crew, 'id'>): Observable<Crew> {
    return this.create(crew);
  }

  create(crew: Omit<Crew, 'id'>): Observable<Crew> {
    const newCrew = {
      ...crew,
      id: Math.max(...this.crews.map(c => c.id)) + 1
    };
    this.crews.push(newCrew);
    this.crewsSubject.next(this.crews);
    return of(newCrew);
  }

  updateCrew(crew: Crew): Observable<Crew> {
    return this.update(crew.id, crew);
  }

  update(id: number, crew: Crew): Observable<Crew> {
    const index = this.crews.findIndex(c => c.id === id);
    if (index !== -1) {
      this.crews[index] = crew;
      this.crewsSubject.next(this.crews);
      return of(crew);
    }
    throw new Error('Crew not found');
  }

  deleteCrew(id: number): Observable<void> {
    return this.delete(id);
  }

  delete(id: number): Observable<void> {
    const index = this.crews.findIndex(c => c.id === id);
    if (index !== -1) {
      this.crews.splice(index, 1);
      this.crewsSubject.next(this.crews);
      return of(void 0);
    }
    throw new Error('Crew not found');
  }

  getCrewWithCertificates(id: number): Observable<CrewWithCertificates | undefined> {
    return this.getById(id).pipe(
      switchMap(crew => {
        if (!crew) return of(undefined);
        return this.certificateService.getAll().pipe(
          map(certificates => {
            const crewCertificates = certificates.filter(cert => 
              crew.certificateIds.includes(cert.id)
            );
            return {
              ...crew,
              certificates: crewCertificates
            };
          })
        );
      })
    );
  }
}

interface CrewWithCertificates extends Crew {
  certificates: Certificate[];
}
