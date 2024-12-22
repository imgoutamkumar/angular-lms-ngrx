import { Component, signal, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectIsLoading,
  selectSelectedCourse,
} from '../../../store/selectors/course.selectors';
import { tap } from 'rxjs';
import { loadCourseById } from '../../../store/actions/course.action';
import { Course } from '../../../models/course.models';

@Component({
  selector: 'app-course-details',
  imports: [MatProgressSpinnerModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent implements OnInit {
  isLoading = signal<boolean>(false);
  courseDetails = signal<any>(null);
  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
    this.store
      .select(selectIsLoading)
      .pipe(
        tap((data) => {
          this.isLoading.set(data);
        })
      )
      .subscribe();

    this.store.dispatch(
      loadCourseById({
        id: String(this.activatedRoute.snapshot.paramMap.get('id')),
      })
    );
  }
  ngOnInit(): void {
    this.store.select(selectSelectedCourse).subscribe({
      next: (result) => {
        if (result) {
          this.courseDetails.set(result);
        }
      },
    });
  }
}
