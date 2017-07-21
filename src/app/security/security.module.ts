import { NgModule } from '@angular/core';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { HttpAuthService } from './http-auth.service';
import {GuardConnectedUserGuard} from "./guard-connected-user.guard";

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    UserService,
    HttpAuthService,
    GuardConnectedUserGuard
  ],
  declarations: [LoginComponent]
})
export class SecurityModule { }
