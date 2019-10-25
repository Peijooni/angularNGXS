import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { Store } from '@ngxs/store';
import { LogIn, LogOut } from 'src/app/actions/practise.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router, private store: Store, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      const code = params['code'];
      if(code !== undefined && code.length) {
        try {
          const token = this.getToken(code);
          token.then(data => {
            if(data === false) {
              this.store.dispatch(new LogOut());
              this._router.navigate(['/login']);
            } else {  
              this.store.dispatch(new LogIn( data ));
              this._router.navigate(['/app']);
            }
          }).catch(error => console.error(error));
        } catch (error) {
          console.error(error);
        }
      }
  });
  }

  getToken = async (code: string): Promise<any>  => {
    const body = {
      client_id: '1159e004bdfd8fd0d590',
      client_secret: 'daa9d17cefe8ca51591ae9b06601541b260c70db',
      code: code
    }
    
    /*
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });
    let options = { headers: headers };
    this.http.post('https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', body, options)
    .subscribe((data: any) => {
      console.log(data);
      if(data.access_token) {
        console.log(data.access_token);
        this.store.dispatch(new LogIn( data.access_token ));
      } 
        console.log(data.error);
        this.store.dispatch(new LogOut());
        return false;
      
    });
    */
    
    let res = await axios.post('https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', body);
    let splitted = res.data.split("&");
    splitted = splitted[0].split("=");
    if(splitted[0] === "access_token") {
      return splitted[1];
    }    
    return false;    
  }

  ngOnInit() {
  }

}
