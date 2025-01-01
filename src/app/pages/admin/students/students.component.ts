import { Component, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  UserActions,
  UserQueryParams,
} from '../../../store/actions/user.action';
import { selectUsers } from '../../../store/selectors/user.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-students',
  imports: [MatProgressSpinnerModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit {
  constructor(private store: Store) {
    console.log('ngOnInit called');
    var queryParams: UserQueryParams = {
      search: '',
      filter: '',
      page: 1,
      limit: 5,
    };
    this.store.dispatch(UserActions.loadUsers({ queryParams }));
    this.store.select(selectUsers).subscribe({
      next: (response) => {
        console.log('response :', response);
      },
      error: (error) => {
        console.log('error :', error);
      },
    });
  }

  ngOnInit(): void {
    /* this.store.select(selectUsers).subscribe({
      next: (response) => {
        console.log('response :', response);
      },
      error: (error) => {
        console.log('error :', error);
      },
    }); */
  }
}
