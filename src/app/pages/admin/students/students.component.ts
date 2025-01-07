import {
  AfterViewInit,
  Component,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  UserActions,
  UserQueryParams,
} from '../../../store/actions/user.action';
import {
  selectTotal,
  selectUsers,
} from '../../../store/selectors/user.selectors';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-students',
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    AsyncPipe,
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit, AfterViewInit {
  total$ = new Observable<number>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private store: Store) {
    console.log('constructor called');
  }
  displayedColumns: string[] = [
    'Id',
    'firstName',
    'lastName',
    'gender',
    'phone',
  ];
  data: any;
  dataSource = new MatTableDataSource<any>([]);

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  // Initial query parameters
  queryParams: UserQueryParams = {
    search: '',
    filter: '',
    page: 1,
    limit: 10,
  };
  ngOnInit(): void {
    console.log('ngOnInit called');
    this.store.dispatch(
      UserActions.loadUsers({ queryParams: this.queryParams })
    );
    this.total$ = this.store.select(selectTotal);
    /* var queryParams: UserQueryParams = {
      search: '',
      filter: '',
      page: 1,
      limit: 10,
    };

    this.isLoadingResults = true;
    this.store.dispatch(
      UserActions.loadUsers({ queryParams})
    ); */
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit called');

    this.store.select(selectUsers).subscribe({
      next: (users) => {
        this.isLoadingResults = false;
        console.log('response :', users);
        /* this.data = new MatTableDataSource(users);
        this.data.paginator = this.paginator;
        this.data.sort = this.sort; */
        this.dataSource.data = users;

        // Assign paginator and sort after dataSource is populated
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        this.isLoadingResults = false;
        console.log('error :', error);
      },
    });

    // Listen to total count changes
    this.store.select(selectTotal).subscribe({
      next: (total) => {
        console.log('total:', total);
        this.resultsLength = total;
      },
      error: (error) => {
        console.error('Error fetching total count:', error);
      },
    });

    // Listen to paginator page changes
    this.paginator.page.subscribe((event: PageEvent) => {
      this.onPageChange(event);
    });
  }
  loadUsers(): void {
    this.isLoadingResults = true;
    this.store.dispatch(
      UserActions.loadUsers({ queryParams: this.queryParams })
    );
    // this.total$ = this.store.select(selectTotal);
  }
  onPageChange(event: PageEvent): void {
    console.log('event.pageIndex :', event.pageIndex);
    console.log('event.pageSize :', event.pageSize);

    this.queryParams = {
      ...this.queryParams,
      page: event.pageIndex + 1, // Adjust for zero-based index
      limit: event.pageSize,
    };
    this.loadUsers(); // Trigger data reload
  }

  onSearch(event: Event) {
    console.log('search value:', (event.target as HTMLInputElement).value);
    //this.store.dispatch(UserActions.loadUsers({ queryParams }));
  }
}
