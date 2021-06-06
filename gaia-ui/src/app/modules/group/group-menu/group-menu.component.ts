import {
  Component, OnInit, Input, Output, EventEmitter,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GroupService } from '@src/app/services/group-service/group.service';
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

  addGroupActive = false;

  editMode = false;

  addGroupForm = this.formBuilder.group({ groupName: '' });

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,
  ) { }

  ngOnInit(): void {
    this.onSelect(this.groups[0]);
  }

  onSelect(group: Group): void {
    this.selectedGroup = group;
    this.change.emit(this.selectedGroup);
  }

  addGroup() {
    if (this.addGroupForm.value.groupName.length > 0) {
      this.groupService.addGroup(this.addGroupForm.value.groupName).subscribe();
    }
    this.addGroupActive = false;
  }

  deleteGroup(group: Group) {
    this.groupService.removeGroup(group.id).subscribe();
    this.onSelect(this.groups[0]);
  }
}
