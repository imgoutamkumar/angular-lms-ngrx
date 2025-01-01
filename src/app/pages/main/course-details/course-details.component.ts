import { Component, signal, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectCourseReviews,
  selectIsLoading,
  selectSelectedCourse,
} from '../../../store/selectors/course.selectors';
import { Observable, tap } from 'rxjs';
import {
  createReview,
  loadCourseById,
} from '../../../store/actions/course.action';
import { Course } from '../../../models/course.models';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-course-details',
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent implements OnInit {
  isLoading = signal<boolean>(false);
  courseDetails = signal<any>(null);
  reviews$: Observable<any>;
  //comment = new FormControl('');
  comment = '';
  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
    this.reviews$ = this.store.select(selectCourseReviews);

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

    /* this.store.select(selectCourseReviews).subscribe({
      next: (result) => {
        if (result) {
          this.courseDetails.set(result);
        }
      },
    }); */
  }

  onSubmitComment() {
    console.log('Comment posted:', this.comment);
    const id = String(this.activatedRoute.snapshot.paramMap.get('id'));
    const data = {
      comment: this.comment.trim(),
    };
    this.store.dispatch(createReview({ id, data }));
  }
}
