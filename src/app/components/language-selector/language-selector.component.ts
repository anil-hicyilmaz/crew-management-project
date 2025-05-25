import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent {
  languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'French' },
    { code: 'pt', label: 'Portuguese' }
  ];

  constructor(private translate: TranslateService) {}

  changeLang(lang: string) {
    this.translate.use(lang);
  }
}
