import { Component, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { loadCourses } from '../../../store/actions/course.action';
import { selectAllCourses } from '../../../store/selectors/course.selectors';
import { CourseCardComponent } from '../../../components/main/course-card/course-card.component';
import { CommonModule } from '@angular/common';
import { FilterCoursesPipe } from '../../../pipes/filter-courses.pipe';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseCardComponent, CommonModule, FilterCoursesPipe],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  courses$: Observable<any>;
  searchTerm = signal<string>('');

  searchSubject: Subject<string> = new Subject();
  constructor(private store: Store) {
    this.store.dispatch(loadCourses());
    this.courses$ = this.store.select(selectAllCourses);
  }

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged() // Wmit only if vlue chnages
      )
      .subscribe((data) => {
        this.searchTerm.set(data);
      });
  }

  onSearch(value: string) {
    console.log(value);
  }
}
