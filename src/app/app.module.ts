import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersManagementService } from './services/users-management.service';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export function provideConfig() {
  return config;
}
const googleLoginOptions = {
  scope: 'profile email',
  plugin_name:'login'
}; 
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("498683162143-e11m9035v55gro03ptbjug8h5stvn2ql.apps.googleusercontent.com", googleLoginOptions),
  }
]);


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    UsersManagementService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  exports: [
    UserDetailComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
