import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private afAuth: AngularFireAuth) {

  }

  ngOnInit() {
    this.afAuth.authState.subscribe((authInfo: any) => {
      if (!!authInfo) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/sign-in']);
      }
    });
  }
}
