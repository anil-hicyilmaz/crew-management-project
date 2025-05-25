import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CrewDetailsComponent } from './pages/crew-details/crew-details.component';
import { CertificateTypeComponent } from './pages/certificate-type/certificate-type.component';
import { CertificateTypeFormComponent } from './components/certificate-type-form/certificate-type-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'crew/:id', component: CrewDetailsComponent },
  { path: 'certificate-type', component: CertificateTypeComponent },
  { path: 'certificate-types/new', component: CertificateTypeFormComponent },
  { path: '**', redirectTo: '' }
];
