import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrewService } from 'src/app/services/crew/crew.service';
import { Crew } from 'src/app/models/crew.model';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { CrewTableComponent } from 'src/app/components/crew-table/crew-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    TranslateModule,
    CrewTableComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  crews$: Observable<Crew[]>;

  constructor(private crewService: CrewService) {
    this.crews$ = this.crewService.crew$;
  }
}
