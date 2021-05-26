import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';

export interface link {
  name: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.scss'],
})

export class BottomNavbarComponent {
  link: link[] = [
    {
      name: 'Dashboard',
      icon: 'assets/icons/dash.svg',
      route: 'dashboard',
    },
    {
      name: 'categories',
      icon: '',
      route: 'category',
    },
    {
      name: 'Groups',
      icon: '',
      route: 'group',
    },
    {
      name: 'Settings',
      icon: '',
      route: 'settings',
    },
  ];

  constructor() { }
}
