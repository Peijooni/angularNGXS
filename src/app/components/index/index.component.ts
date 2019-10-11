import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Practise } from 'src/app/models/Practise';
import { Store } from '@ngxs/store';
import { DeletePractise, InitPractises } from 'src/app/actions/practise.action';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  practises$: Observable<Practise>;
  constructor(private store: Store) {     
  }

  deleteUser(id: string) {
    this.store.dispatch(new DeletePractise(id));
    //this.http.get('http://localhost:3000').subscribe(testi => {console.log(testi)});
  }


  ngOnInit() {
    this.store.dispatch(new InitPractises());
    this.practises$ = this.store.select(state => state.practises.practises);
  }

}
