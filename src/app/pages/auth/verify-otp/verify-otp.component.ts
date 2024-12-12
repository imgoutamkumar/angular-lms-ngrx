import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.scss',
})
export class VerifyOtpComponent {
  otpForm: FormGroup;

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor(private fb: FormBuilder) {
    this.otpForm = this.fb.group({
      digits: this.fb.array(
        new Array(6)
          .fill('')
          .map(() =>
            this.fb.control('', [
              Validators.required,
              Validators.pattern('^[0-9]$'),
            ])
          )
      ),
    });
  }

  get digits(): FormArray {
    return this.otpForm.get('digits') as FormArray;
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;

    // Move to the next input if a digit is entered
    if (input.value.length === 1 && index < this.otpInputs.length - 1) {
      this.otpInputs.get(index + 1)?.nativeElement.focus();
    }

    // Move to the previous input on Backspace if the input is empty
    if (
      input.value === '' &&
      event instanceof KeyboardEvent &&
      event.key === 'Backspace' &&
      index > 0
    ) {
      this.otpInputs.get(index - 1)?.nativeElement.focus();
    }
  }

  /*   onKey(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && index < 5) {
      const nextInput = document.getElementById(
        `digit-${index + 1}`
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    } else if (event.key === 'Backspace' && index > 0) {
      const prevInput = document.getElementById(
        `digit-${index - 1}`
      ) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  } */

  onSubmit(): void {
    if (this.otpForm.valid) {
      const otpValue = this.digits.value.join('');
      console.log('OTP Submitted:', otpValue);
      // Add your OTP verification logic here
    } else {
      console.log('Form is invalid');
    }
  }

  resetForm(): void {
    this.digits.controls.forEach((control) => control.reset());
  }
}
