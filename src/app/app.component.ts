import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Harjoituspäiväkirja';
  loggedIn$: Observable<boolean>;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.loggedIn$ = this.store.select(state => state.practises.access_token);
  }

}
