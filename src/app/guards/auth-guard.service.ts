import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { tap, take, map } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {


  constructor(private router: Router, private store: Store) {
  }

  async getTokenFromStore(): Promise<any> {
    return await this.store.select(state => state.practises.access_token)
    .pipe(take(1))
    .toPromise();
  }

  async canActivate(): Promise<boolean> {
    const token =  this.getTokenFromStore();
    return await token.then(data => {
      if (data !== null) {
        return true;
      } else {
        this.router.navigate(['/logout']);
        return false;
      }
    });
  }
}
