import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GetAllGroupsQuery } from 'src/app/types';
import getAllGroups from './GraphQL/getAllGroupsQuery.graphql';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private apollo: Apollo) { }

  getAllGroups() {
    return this.apollo.watchQuery<GetAllGroupsQuery>({
      query: getAllGroups,
    })
      .valueChanges;
  }
}
