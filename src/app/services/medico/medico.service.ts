import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../../services/services.index';
import { Medico } from '../../models/medico.model';

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

  cargarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
                .map( (resp:any) => resp.medico);
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

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';

    if(medico._id){
      url += '/' + medico._id;
      url += '?token=' + this._usuarioServices.token;

      return this.http.put(url, medico)
                  .map( (resp: any ) => {
                    swal('Medico actualizado', medico.nombre, 'success');
                    return resp.medico;
                  })
    }

    url += '?token=' + this._usuarioServices.token;

    return this.http.post(url, medico)
              .map( (resp: any) => {
                swal('Medico creado', medico.nombre, 'success');
                return resp.medico;
              });
  }

}
