import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../model/profile.service';
import { Profile } from '../../model/profile';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
  providers: [
    ProfileService,
  ],
})
export class MenusComponent implements OnInit {
  profile: Profile = {
    authenticated: false,
  };

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.isAuthenticated();
  }

  isAuthenticated(): void {
    this.profileService.getProfile()
      .subscribe(profile => this.profile = profile);
  }

}
