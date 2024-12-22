import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss',
})
export class CourseCardComponent {
  constructor(private router: Router) {}
  @Input() courseData: any;

  onCardClick(id: string) {
    this.router.navigate([`/main/course/details/${id}`]);
  }
}
