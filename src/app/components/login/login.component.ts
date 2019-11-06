import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { Store } from '@ngxs/store';
import { LogIn, LogOut } from 'src/app/actions/practise.action';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  APIEndpoint: any;
  constructor(private router: Router, private store: Store, private activatedRoute: ActivatedRoute) {

  }

  userExists = async (token: string): Promise<boolean> => {
    const res = await axios.get(this.APIEndpoint + '/userExists?token=' + token);
    return res.data.userExists;
  }

  createUser = async (token: string): Promise<boolean> => {
    const res = await axios.get(this.APIEndpoint + '/createUser?token=' + token);
    return res.data.id;
  }


  getToken = async (code: string): Promise<any>  => {
    const body = {
      client_id: '1159e004bdfd8fd0d590',
      client_secret: 'daa9d17cefe8ca51591ae9b06601541b260c70db',
      code
    };

    const res = await axios.post('https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', body);
    let splitted = res.data.split('&');
    splitted = splitted[0].split('=');
    if (splitted[0] === 'access_token') {
      return splitted[1];
    }
    return false;
  }

  ngOnInit() {
    this.APIEndpoint = environment.APIEndpoint;
    this.activatedRoute.queryParams.subscribe(params => {
      const code = params.code;
      const state = params.state;
      if (state !== 'abcddcba12344321') { // security check
        this.store.dispatch(new LogOut());
        this.router.navigate(['/login']);
      }
      if (code !== undefined && code.length) {
        try {
          const token = this.getToken(code);
          token.then(data => {
            if (data === false) {
              this.store.dispatch(new LogOut());
              this.router.navigate(['/login']);
            } else {
              // check if new user is in need to be created
              this.userExists(data).then(info => {
                if (info) {
                  this.store.dispatch(new LogIn( data ));
                  this.router.navigate(['/app']);
                } else {
                    this.createUser(data).then(res => {
                    console.log('created new user with id: ', res);
                    this.store.dispatch(new LogIn( data ));
                    this.router.navigate(['/app']);
                  });
                }
              });
            }
          }).catch(error => console.error(error));
        } catch (error) {
          console.error(error);
        }
      } else {
        // redirect to github-login
        window.location
        .replace('http://github.com/login/oauth/authorize?client_id=1159e004bdfd8fd0d590' +
        '&redirect_uri=http://localhost:4200/login&state=abcddcba12344321');
      }
    });
  }

}
