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
import { MediaService } from '../../../services/media.service';

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
  constructor(
    private formBuilder: FormBuilder,
    private mediaService: MediaService
  ) {
    this.createCourseForm = this.formBuilder.group({
      title: [''],
      category: [''],
      level: [''],
      price: [''],
      primaryLanguage: [''],
      subtitle: [''],
      description: [''],
      objectives: [''],
      welcomeMessage: [''],
      imageUrl: [''],
      lectures: this.formBuilder.array([
        this.formBuilder.group({
          title: [''],
          isPreview: [false],
          videoUrl: [''],
          public_id: [''],
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

  async onSelectCourseImage(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);

      this.mediaService.uploadFile(formData).subscribe({
        next: (result) => {
          console.log(result);
          this.createCourseForm.patchValue({ imageUrl: result.data.url });
        },
        error: (error) => {
          console.log('error', error);
        },
      });
      //this.createCourseForm.patchValue({ image: file });
    }
  }

  onSelecteLectureVideo(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.selectedVideo = input.files[0].name;
      const formData = new FormData();
      formData.append('file', file);

      this.mediaService.uploadFile(formData).subscribe({
        next: (result) => {
          console.log(result);
          const lectureGroup = this.lectures.at(index) as FormGroup;
          lectureGroup.patchValue({ videoUrl: result.data.url });
          lectureGroup.patchValue({ public_id: result.data.public_id });
        },
        error: (error) => {
          console.log('error', error);
        },
      });
    }
  }

  onSubmit() {
    console.log('Submit button called');
    console.log('this.createCourseForm.value', this.createCourseForm.value);
  }
}
