import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CreateCourseComponent } from '../../../components/dialogs/create-course/create-course.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CourseService } from '../../../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
})
export class CourseListComponent {
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.getAllCourses();
  }
  courseList = signal<any>([]);

  getAllCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (response) => {
        console.log(response);
        this.courseList.set(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(CreateCourseComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
