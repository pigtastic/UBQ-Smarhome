import {
  Component, OnInit, Input, Output, EventEmitter,
} from '@angular/core';
import { Group } from '../../../types';

@Component({
  selector: 'group-menu',
  templateUrl: './group-menu.component.html',
  styleUrls: ['./group-menu.component.scss'],
})
export class GroupMenuComponent implements OnInit {
  @Output()
  change = new EventEmitter();

  @Input()
  groups: [Group]

  selectedGroup: Group;

  constructor() { }

  ngOnInit(): void {
    this.onSelect(this.groups[0]);
  }

  onSelect(group: Group): void {
    this.selectedGroup = group;
    this.change.emit(this.selectedGroup);
  }
}
