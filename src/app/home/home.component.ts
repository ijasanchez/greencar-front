import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

export interface Section {
  name: string;
  navigation: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showFiller = false;
  optionMenuSelected = '';

  folders: Section[] = [
    {
      name: 'Profile',
      navigation: '/profile',
      description: 'Update your personal data',
    }
  ];

  constructor() {
  }

  selectMenuOption(option: string) {
    this.optionMenuSelected = option;
  }

}
