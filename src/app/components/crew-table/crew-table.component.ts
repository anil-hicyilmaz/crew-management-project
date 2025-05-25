import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Crew } from 'src/app/models/crew.model';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CrewFormModalComponent } from 'src/app/components/crew-form-modal/crew-form-modal.component';
import { CrewService } from 'src/app/services/crew/crew.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crew-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule
  ],
  templateUrl: './crew-table.component.html',
  styleUrls: ['./crew-table.component.css']
})
export class CrewTableComponent {
  @Input() crews: Crew[] = [];

  displayedColumns = ['actions', 'firstName', 'lastName', 'title', 'daysOnBoard', 'dailyRate', 'currency', 'discount', 'totalIncome'/*, 'certificates'*/];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private crewService: CrewService
  ) {}

  getTotalIncome(crew: Crew): number {
    const income = crew.daysOnBoard * crew.dailyRate;
    return crew.discount ? income - crew.discount : income;
  }

  updateDiscount(event: Event, crew: Crew) {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    crew.discount = isNaN(value) ? 0 : value;
    this.crewService.updateCrew(crew);
  }

  viewCrew(crew: Crew) {
    this.router.navigate(['/crew', crew.id]);
  }

  editCrew(crew: Crew) {
    const dialogRef = this.dialog.open(CrewFormModalComponent, {
      width: '400px',
      data: crew
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crewService.updateCrew(result);
      }
    });
  }

  deleteCrew(crew: Crew) {
    if (confirm('Are you sure you want to delete this crew member?')) {
      this.crewService.deleteCrew(crew.id);
    }
  }
}
