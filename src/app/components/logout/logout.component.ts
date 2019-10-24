import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LogOut } from 'src/app/actions/practise.action';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new LogOut());
  }

}
