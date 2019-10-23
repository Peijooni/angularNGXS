import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
    this.activatedRoute.queryParams.subscribe(params => {
      const code = params['code'];
      if(code.length) {
        try {
          // put the token to the store!
          const token = this.getToken(code);
          token.then(data => {
            if(data === false) {
              //dispatch: not logged in
            } else {
              // dispatch logged in and put token in there
            }
            console.log(data);
          }).catch(error => console.error(error));
        } catch (error) {
          console.error(error);
        }
      }
      

      //console.log(code); // Print the parameter to the console. 
  });
  }

  getToken = async (code: string)  => {
    const body = {
      client_id: '1159e004bdfd8fd0d590',
      client_secret: 'daa9d17cefe8ca51591ae9b06601541b260c70db',
      code: code
    }

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
