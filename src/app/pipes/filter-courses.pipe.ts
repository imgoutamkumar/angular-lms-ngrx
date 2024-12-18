import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCourses',
})
export class FilterCoursesPipe implements PipeTransform {
  transform(courses: any[], searchTerm: string): any {
    if (!searchTerm) {
      return courses;
    }

    const text = searchTerm.toLowerCase();
    return courses.filter((course) => {
      return course.title.toLowerCase().includes(text);
    });
  }
}
