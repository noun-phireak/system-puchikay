//=========================================================>> Core Module
import { NgModule } from '@angular/core';

//=========================================================>> Third Party Module
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';


//=========================================================>> Custom Module
import { FuseSharedModule } from '@fuse/shared.module';

//=========================================================>> Component
import { CheckLoginComponent } from './check-login/check-login.component'; 
import { LoginComponent } from './login/login.component';
import { ForgotPassword2Component } from './forgot-password/forgot-password.component';
import { VerifyPassword2Component } from './verify-code/verify-code.component';
import { ChangePassword2Component } from './change-password/change-password.component';
import { AuthRoutingModule } from './auth-routing.module';
import { VerifyAccount2Component } from './verify-account/verify-account.component';
import { Register2Component } from'./register/register.component'

@NgModule({
    declarations: [
        CheckLoginComponent, 
        LoginComponent, 
        ForgotPassword2Component,
        VerifyPassword2Component,
        ChangePassword2Component,
        Register2Component,
        VerifyAccount2Component,
    ],
    bootstrap:[CheckLoginComponent],
    imports: [
        MatProgressSpinnerModule, 
        MatProgressBarModule, 
        MatSnackBarModule, 
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
        AuthRoutingModule,
    ]
})
export class AuthModule {
}
