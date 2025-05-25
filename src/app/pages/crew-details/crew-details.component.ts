import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CrewService } from 'src/app/services/crew/crew.service';
import { Crew } from 'src/app/models/crew.model';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-crew-details',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    TranslateModule
  ],
  templateUrl: './crew-details.component.html',
  styleUrls: ['./crew-details.component.css']
})
export class CrewDetailsComponent {
  crew: Crew | undefined;

  constructor(private route: ActivatedRoute, private crewService: CrewService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.crewService.getCrewById(id).subscribe(crew => {
      this.crew = crew;
    });
  }
}
