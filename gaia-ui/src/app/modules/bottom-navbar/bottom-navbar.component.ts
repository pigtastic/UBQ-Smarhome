import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
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
      icon: 'dashboard',
      route: 'dashboard',
    },
    {
      name: 'Categories',
      icon: 'category',
      route: 'category',
    },
    {
      name: 'Groups',
      icon: 'group',
      route: 'group',
    },
    {
      name: 'Settings',
      icon: 'settings',
      route: 'settings',
    },
  ];

  constructor(public media: MediaObserver) { }
}
