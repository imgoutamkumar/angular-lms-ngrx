import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '../../../services/media.service';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import {
  selectIsLoading,
  selectSelectedCourse,
} from '../../../store/selectors/course.selectors';
import { Course, Lecture } from '../../../models/course.models';
import { loadCourseById } from '../../../store/actions/course.action';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-course-details',
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent implements OnInit {
  updateCourseForm: FormGroup;
  demoVideoUrl = signal(
    'https://res.cloudinary.com/videoapi-demo/video/upload/c_fill,g_auto,ar_2:1,h_192/v1/samples/snowboard_crop_mha2ac'
  );
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mediaService: MediaService,
    private store: Store
  ) {
    this.updateCourseForm = this.formBuilder.group({
      title: [{ value: '' }],
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
        /* this.formBuilder.group({
          title: [''],
          isFreePreview: [''],
          videoUrl: [''],
          public_id: [''],
        }), */
      ]),
      coupanCode: [''],
      discount: [''],
    });
  }

  isEditing = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  courseDetails = signal<Course | any>({});
  ngOnInit(): void {
    if (!this.isEditing()) {
      this.updateCourseForm.disable();
      (this.updateCourseForm.get('lectures') as FormArray).disable();
    }

    this.store.dispatch(
      loadCourseById({
        id: String(this.activatedRoute.snapshot.paramMap.get('id')),
      })
    );

    // Use reduce to populate both static fields and the lectures array
    this.store.select(selectSelectedCourse).subscribe({
      next: (result) => {
        if (result) {
          this.courseDetails.set(result);
          // Clear the existing lectures FormArray
          const lecturesArray = this.updateCourseForm.get(
            'lectures'
          ) as FormArray;
          while (lecturesArray.length) {
            lecturesArray.removeAt(0); // Remove each control in the array
          }
          const populatedForm = (
            Object.keys(result) as (keyof Course)[]
          ).reduce((acc, key) => {
            if (key === 'lectures') {
              const lecturesArray = this.updateCourseForm.get(
                'lectures'
              ) as FormArray;
              (result[key] as Lecture[]).forEach((lecture: any) => {
                lecturesArray.push(
                  this.formBuilder.group({
                    title: [lecture.title],
                    isFreePreview: [lecture.isFreePreview],
                    videoUrl: [lecture.videoUrl],
                    public_id: [lecture.public_id],
                  })
                );
              });
            } else {
              acc[key] = (result as any)[key]; // Use type assertion here
            }
            return acc;
          }, {} as Partial<Course>);
          this.updateCourseForm.patchValue(populatedForm);
        }
      },
    });

    this.store
      .select(selectIsLoading)
      .pipe(
        tap((data) => {
          this.isLoading.set(data);
          console.log(this.isLoading());
        })
      )
      .subscribe();
  }

  get lectures() {
    return this.updateCourseForm.get('lectures') as FormArray;
  }

  addLecture() {
    const lecturesArray = this.updateCourseForm.get('lectures') as FormArray;
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
    const lecturesArray = this.updateCourseForm.get('lectures') as FormArray;
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
          this.updateCourseForm.patchValue({ imageUrl: result.data.url });
        },
        error: (error) => {
          console.log('error', error);
        },
      });
      //this.updateCourseForm.patchValue({ image: file });
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

  onEditButtonClicked(): void {
    console.log('Editing state before set:', this.isEditing()); // Log the current state of isEditing

    this.isEditing.set(!this.isEditing()); // Toggle editing state

    if (this.isEditing()) {
      this.updateCourseForm.enable(); // Enable all fields
    }

    console.log('Editing state after set:', this.isEditing()); // Log the current state of isEditing
  }

  onCancelButtonClick() {
    this.isEditing.set(false); // Toggle editing state
  }

  onSubmit() {
    console.log('Submit button called');
    console.log('this.updateCourseForm.value', this.updateCourseForm.value);
  }
}
