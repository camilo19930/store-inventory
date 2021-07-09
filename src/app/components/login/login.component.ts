import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.form = this.construirFormulario();
  }

  ngOnInit(): void {
  }

  private construirFormulario(): any {
    return this.formBuilder.group({
      username: new FormControl(null, [Validators.required, Validators.maxLength(25)]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(25)]),
    });
  }

  get username(): any { return this.form.get('username'); }
  get password(): any { return this.form.get('password'); }

  validarCredenciales(): void {
    const userCredencial = 'Marte';
    const passwordCredencial = '1234';
    console.log(this.username.value, this.password.value);
    console.log((userCredencial === this.username.value));
    if ((userCredencial === this.username.value) && (passwordCredencial === this.password.value)) {
    } else {
    }
  }
}
