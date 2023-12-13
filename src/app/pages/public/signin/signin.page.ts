/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  current_year: number = new Date().getFullYear();

  signin_form: FormGroup;
  submit_attempt: boolean = false;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {

    // Setup form
    this.signin_form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    // DEBUG: Prefill inputs
    this.signin_form.get('email').setValue('john.doe@mail.com');
    this.signin_form.get('password').setValue('123456');
  }

  // Sign in
  async signIn() {

    this.submit_attempt = true;

    // If email or password empty
    if (this.signin_form.value.email === '' || this.signin_form.value.password === '') {
      this.toastService.presentToast('Error', 'Please input email and password', 'top', 'danger', 2000);

    } else {

      // Proceed with loading overlay
      const loading = await this.loadingController.create({
        cssClass: 'default-loading',
        message: '<p>Signing in...</p><span>Please be patient.</span>',
        spinner: 'crescent'
      });
      await loading.present();

      // TODO: Add your sign in logic
      console.log('starting auth request');
      this.authService.signIn(this.signin_form.value.email, this.signin_form.value.password).then(async (response: any)=>{
        console.log(response.status, response);
        if(response.status){
          loading.dismiss();
          await this.router.navigate(['/home']);
        }else{
          loading.dismiss();
          this.toastService.presentToast('Error', 'Error al inciar sescion', 'top', 'danger', 2000);
        }
      }).catch(error=>{
        console.error(error);
        loading.dismiss();
        this.toastService.presentToast('Error', 'Error al inciar sescion', 'top', 'danger', 2000);
      });

      // Fake timeout
      // setTimeout(async () => {
      //   // Sign in success
      //   await this.router.navigate(['/home']);
      //   loading.dismiss();
      // }, 2000);

    }
  }

}
