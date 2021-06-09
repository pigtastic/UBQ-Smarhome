import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatIconRegistry } from '@angular/material/icon/';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gaia-app';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public media: MediaObserver,
  ) {
    this.matIconRegistry.addSvgIcon(
      'burger-menu',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/menu.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'add',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/add.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'trash',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/trash.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/edit.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'lock',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/lock.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'arrow_left',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/arrow_left.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'dashboard',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/dashboard.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'settings',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/settings.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'category',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/category.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'group',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/group.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'sun',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/sun.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'moon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/moon.svg'),
    );
  }
}
