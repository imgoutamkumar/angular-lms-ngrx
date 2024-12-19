import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CreateCourseComponent } from '../../../components/dialogs/create-course/create-course.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CourseService } from '../../../services/course.service';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterCoursesPipe } from '../../../pipes/filter-courses.pipe';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Course } from '../../../models/course.models';
import { selectAllCourses } from '../../../store/selectors/course.selectors';
import {
  loadCourseById,
  loadCourses,
} from '../../../store/actions/course.action';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    UpperCasePipe,
    FormsModule,
    FilterCoursesPipe,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
})
export class CourseListComponent {
  courses$ = signal<Array<Course>>([]);
  constructor(
    private courseService: CourseService,
    private store: Store,
    private router: Router
  ) {
    this.store.dispatch(loadCourses());
    this.store.select(selectAllCourses).subscribe((courses) => {
      this.courses$.set(courses);
    });
  }

  ngOnInit(): void {}

  searchTerm = signal('');
  courseList = signal<any>([]);

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(CreateCourseComponent, {
      width: '60%', // Set custom width here (percentage, px, rem, etc.)
      maxWidth: 'none', // Prevents default max-width constraint
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onClickViewButton(id: string) {
    this.router.navigate([`/admin/course/details/${id}`]);
    //this.router.navigate(['/admin/course/details'], { queryParams: { id } }); // another way
  }
}
