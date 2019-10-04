import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { Store } from '@ngxs/store';
import { DeleteUser } from 'src/app/actions/user.action';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  users: Observable<User>;
  constructor(private store: Store) { 
    this.users = this.store.select(state => state.users.users);
  }

  deleteUser(id: string) {
    this.store.dispatch(new DeleteUser(id));
  }
  ngOnInit() {
  }

}
