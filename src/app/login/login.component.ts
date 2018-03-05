import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(
    public _router:Router, 
    public userService: UsuarioService
  ) { }

  ngOnInit() {
  	init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 1){
      this.recuerdame = true;
    }
  }

  googleInit(){

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '661332995109-dgfdbklnveibfngk829sbd6cfmknta8r.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));

    });

  }

  attachSignin( element ){

    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this.userService.loginGoogle(token)
          .subscribe( () => window.location.href = '#/dashboard' );

    });

  }

  ingresar(forma: NgForm){

    if(forma.invalid){
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this.userService.login(usuario, forma.value.recuerdame)
                .subscribe( correcto => this._router.navigate(['/dashboard']) );

  	//this._router.navigate(['/dashboard']);
  }

}
