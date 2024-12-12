import { Component, OnInit, signal } from '@angular/core';
import { ProductCardComponent } from '../../../components/product-card/product-card.component';
import { Store } from '@ngrx/store';
import { loadCourses } from '../../../store/actions/course.action';
import { getCourseList } from '../../../store/selectors/course.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  courses$: Observable<any>;

  constructor(private store: Store) {
    this.store.dispatch(loadCourses());
    this.courses$ = this.store.select(getCourseList);
  }

  ngOnInit(): void {}

  //courses = signal<any>([]);

  /* getAllProduct() {
    this.store.dispatch(loadCourses());
    this.store.select(getCourseList).subscribe({
      next: (response) => {
        console.log('response :', response);
        this.courses.set(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  } */
}
