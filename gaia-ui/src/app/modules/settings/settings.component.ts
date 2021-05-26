import { Component, OnInit, Output } from '@angular/core';

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

  public changeEdit() {
    if (this.icon === 'edit') {
      this.icon = 'check';
      this.isReadonly = !this.isReadonly;
    } else {
      this.icon = 'edit';
      this.isReadonly = !this.isReadonly;
    }
  }
}
