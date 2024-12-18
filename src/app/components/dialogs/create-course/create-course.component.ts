import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss',
})
export class CreateCourseComponent {
  createCourseForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.createCourseForm = this.formBuilder.group({
      title: [''],
      category: [''],
      level: [''],
      pricing: [''],
      primaryLanguage: [''],
      subtitle: [''],
      description: [''],
      objectives: [''],
      welcomeMessage: [''],
      image: [''],
      lectures: this.formBuilder.array([
        this.formBuilder.group({
          title: [''],
          isPreview: [false],
          videoUrl: [''],
          //public_id: [''],
        }),
      ]),
      coupanCode: [''],
      discount: [''],
    });
  }

  get lectures() {
    return this.createCourseForm.get('lectures') as FormArray;
  }

  addLecture() {
    const lecturesArray = this.createCourseForm.get('lectures') as FormArray;
    lecturesArray.push(
      this.formBuilder.group({
        title: [''],
        isPreview: [false],
        videoUrl: [''],
        //public_id: [''],
      })
    );
  }

  removeLecture(index: number) {
    const lecturesArray = this.createCourseForm.get('lectures') as FormArray;
    lecturesArray.removeAt(index);
  }

  selectedVideo = '';

  onSelectCourseImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.createCourseForm.patchValue({ image: file });
      // this.createCourseForm.get('image')?.updateValueAndValidity();
    }
  }

  onSelecteLectureVideo(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.selectedVideo = input.files[0].name;
      const lectureGroup = this.lectures.at(index) as FormGroup;
      lectureGroup.patchValue({ videoUrl: file });
    }
  }

  onSubmit() {
    console.log('Submit button called');
    console.log('this.createCourseForm.value', this.createCourseForm.value);
  }
}
