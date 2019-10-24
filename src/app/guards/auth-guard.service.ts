import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { tap, take, map } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {


  constructor(private _router: Router, private store: Store) {
  }

  async getFromStore() {
    let res: any;

    await this.store.select(state => state.practises.access_token)
    .pipe(take(1))
    .toPromise()
    .then(data => res = data);
    return res;
  }

  async canActivate() {    
    const token =  this.getFromStore();
    return await token.then(data => {
      if(data !== null) {
        return true;
      } else {
        this._router.navigate(['/login']);
        return false;      
      }
    });
  }
}
