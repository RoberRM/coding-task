import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, SocialUser, GoogleLoginProvider } from "angularx-social-login";
import { UsersManagementService } from '../services/users-management.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private auth2: any;

  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;

  user: SocialUser;
  loggedIn: boolean;

  constructor(private router: Router, private authService: AuthService, private usersManagementService: UsersManagementService, private activatedRoute: ActivatedRoute) { }

  public ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  public signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((googleUser) => {
      this.usersManagementService.setUserLogged(googleUser);
      this.router.navigate(['main'], { relativeTo: this.activatedRoute });
    });
  }
}
