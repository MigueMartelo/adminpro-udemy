import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';

import { UsuarioService } from '../services.index';
import { SubirArchivosService } from '../services.index';

declare var swal: any;

@Injectable()
export class HospitalService {

  hospital: Hospital;

  constructor(
    public http: HttpClient,
    public _router: Router,
    public _subirArchivosService: SubirArchivosService,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales(){
    let url = URL_SERVICIOS + '/hospital';
    return this.http.get(url);
  }

  obtenerHospital(id: string){
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
                .map((resp:any) => resp.hospital);
  }

  guardarHospital(nombre: string){
    let url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;
    return this.http.post(url, {nombre})
                 .map( (resp:any) => resp.hospital);
  }

  borrarHospital(id: string){
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .map( resp => swal('Hospital Borrado', 'Eliminado correctamente', 'success'));
  }

  buscarHospitales(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
                .map((resp: any) => resp.hospitales);
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token='+ this._usuarioService.token;
    return this.http.put(url, hospital)
                .map( (resp:any) => resp.hospital);
  }

}
