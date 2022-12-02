import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { form } from 'src/app/configs/constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: any;
  constructor(private form: FormBuilder) {}
  ngOnInit(): void {
    this.forgotPasswordForm = this.form.group({
      email: ['', [Validators.required]],
    });
  }
  get email() {
    return this.forgotPasswordForm.get(form.email);
  }
}
