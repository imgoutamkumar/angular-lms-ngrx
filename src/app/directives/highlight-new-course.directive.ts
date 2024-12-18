import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlightNewCourse]',
})
export class HighlightNewCourseDirective {
  isNew = input(false);
  el = inject(ElementRef);

  constructor() {}
  styleEffect = effect(() => {
    if (this.isNew()) {
      this.el.nativeElement.style.color = '#6c757d';
      this.el.nativeElement.style.backgroundColor = '#d3f9d8';
    } else {
      this.el.nativeElement.style.color = '#fff';
      this.el.nativeElement.style.backgroundColor = '#000';
    }
  });
}
