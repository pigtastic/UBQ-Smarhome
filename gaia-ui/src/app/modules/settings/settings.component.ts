import {
  Component, Input, OnInit, Output,
} from '@angular/core';
import { environment } from '@src/environments/environment';

interface Language {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})

export class SettingsComponent {
  languages: Language[] = [
    { value: 'deutsch-0', viewValue: 'Deutsch' },
    { value: 'englisch-1', viewValue: 'Englisch' },
    { value: 'python-2', viewValue: 'Python' },
  ];

  constructor() { }

  public icon = 'edit';

  isReadonly = true;

  public server = '';

  public changeEdit() {
    if (this.icon === 'edit') {
      this.icon = 'check';
      this.isReadonly = !this.isReadonly;
    } else {
      this.icon = 'edit';
      this.isReadonly = !this.isReadonly;
      if (this.server.length > 0) {
        environment.server.url = this.server;
      }
    }
  }
}
