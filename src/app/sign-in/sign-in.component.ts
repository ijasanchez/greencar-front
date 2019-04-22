import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
import { User } from '../core/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(public authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.authService.authData.subscribe((authData: {isAuthenticated: boolean, data: any}) => {
      if (authData.isAuthenticated) {
        const user: User = {
          id: authData.data.additionalUserInfo.profile.id,
          first_name: authData.data.additionalUserInfo.profile.first_name,
          last_name: authData.data.additionalUserInfo.profile.last_name,
          full_name: authData.data.additionalUserInfo.profile.name,
          photo: authData.data.additionalUserInfo.profile.picture.data.url,
          email: authData.data.additionalUserInfo.profile.email
        };
        this.registerUser(user);
      } else {
        console.error('Authentication failed');
      }
    });
  }

  async registerUser(user: User) {
    const isRegisteredUser = await this.userService.userExist(user.id);
    if (!isRegisteredUser) {
      this.userService.create(user);
    } else {
      this.userService.update(user);
    }
  }

}
