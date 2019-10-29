import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compound',
  templateUrl: './compound.component.html',
  styleUrls: ['./compound.component.css']
})
export class CompoundComponent implements OnInit {

  constructor(private store: Store, private _router: Router) { }

  ngOnInit() {
    /*
    this.store.select(state => state.practises.access_token)
    .subscribe(data => {
      if(!data) {
        this._router.navigate(['/login']);
      }
    })
*/
  }

}
