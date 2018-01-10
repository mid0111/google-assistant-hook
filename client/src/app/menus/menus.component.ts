import { Component, OnInit } from '@angular/core';
import { ProfileService, Profile } from '../profile.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  profile: Profile = {
    authenticated: false
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
