import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { tap, take, map } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {


  constructor(private _router: Router, private store: Store) {
  }

  async getTokenFromStore(): Promise<any> {
    let res: string;

    await this.store.select(state => state.practises.access_token)
    .pipe(take(1))
    .toPromise()
    .then(data => res = data);
    return res;
  }

  async canActivate(): Promise<boolean> {    
    const token =  this.getTokenFromStore();
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
