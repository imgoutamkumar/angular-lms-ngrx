import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCourses } from '../../../store/actions/course.action';
import { selectAllCourses } from '../../../store/selectors/course.selectors';
import { CourseCardComponent } from '../../../components/main/course-card/course-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseCardComponent, CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  courses$: Observable<any>;

  constructor(private store: Store) {
    this.store.dispatch(loadCourses());
    this.courses$ = this.store.select(selectAllCourses);
  }

  ngOnInit(): void {}
}
