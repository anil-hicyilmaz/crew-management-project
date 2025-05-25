import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { CrewFormModalComponent } from './components/crew-form-modal/crew-form-modal.component';
import { CrewService } from './services/crew/crew.service';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    LanguageSelectorComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public router: Router,
    private dialog: MatDialog,
    private crewService: CrewService
  ) {}

  get showAddCrew(): boolean {
    return this.router.url === '/';
  }

  addCrew() {
    const dialogRef = this.dialog.open(CrewFormModalComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newCrew = { ...result, id: Date.now(), certificates: [] };
        this.crewService.addCrew(newCrew);
      }
    });
  }
}
