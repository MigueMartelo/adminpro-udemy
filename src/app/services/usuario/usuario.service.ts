import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { SubirArchivosService } from '../services.index';
import { Observable } from 'rxjs/Observable';

declare var swal: any;

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(
    public http: HttpClient,
    public _router: Router,
    public _subirArchivoService: SubirArchivosService
  ) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoke';
    url += '?token=' + this.token;

    return this.http.get(url)
                .map( (resp: any) => {
                  this.token = resp.token;
                  localStorage.setItem('token', this.token);
                  return true;
                })
                .catch(err => {
                  this._router.navigate(['/login']);
                  swal('No se puede renovar token', 'No fue posible renovar el token', 'error');
                  return Observable.throw(err);
                });
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario) );
    localStorage.setItem('menu', JSON.stringify(menu) );

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logOut() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this._router.navigate(['/login']);

  }

  loginGoogle( token: string ) {

    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token})
                .map( (resp: any) => {
                  this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                  return true;
                });
  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
                .map( (resp: any) => {
                  this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                  return true;
                })
                .catch( err => {
                  swal('Error en el login', err.error.mensaje, 'error');
                  return Observable.throw(err);
                });
  }

  crearUsuario( usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
          .map( (resp: any) => {
              swal('Usuario creado ', usuario.email, ' success');
              return resp.usuario;
          })
          .catch( err => {
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return Observable.throw(err);
          });
  }

  actualizarUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario )
                .map( (resp: any) => {

                  if ( usuario._id === this.usuario._id){
                    let usuarioDB: Usuario = resp.usuario;
                    this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
                  }

                  swal('Usuario actualizado', usuario.nombre, 'success');

                  return true;
                })
                .catch( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return Observable.throw(err);
                });                                
  }

  cambiarImagen(file: File, id: string) {

    this._subirArchivoService.subirArchivo(file, 'usuarios', id)
          .then( (resp: any) => {
            this.usuario.img = resp.usuario.imag;
            swal('Imagen actualizada', this.usuario.nombre, 'success');
            this.guardarStorage(id, this.token, this.usuario, this.menu);
          })
          .catch( resp => {
            console.log(resp);
          });
  }

  cargarUsuarios( desde:number = 0 ) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
                .map((resp: any) => resp.usuarios)
                .catch( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return Observable.throw(err);
                });
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
                .map( resp => {
                  swal('Usuario borrado', 'El usuario ha sido borrado correctamente', 'success');
                  return true;
                })
                .catch( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return Observable.throw(err);
                });
  }
}
