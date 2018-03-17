import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../../services/services.index';

declare var swal: any;

@Injectable()
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioServices: UsuarioService
  ) { }

  cargarMedicos() {
    let url = URL_SERVICIOS + '/medico';
    return this.http.get(url)
               .map((resp: any) => {
                 this.totalMedicos = resp.total;
                 return resp.medicos;
               });
  }

  buscarMedicos(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
                .map((resp: any) => resp.medicos);
  }

  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioServices.token;

    return this.http.delete(url)
                .map( (resp: any) => {
                  swal('Médico Borrado', 'Médico borrado correctamente', 'success');
                  return resp;
                })
  }

}
