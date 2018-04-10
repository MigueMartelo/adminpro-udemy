import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { Usuario } from '../../models/usuario.model';

>>>>>>> b2fc80bef4e22a6c35bb23e99d63254ae411aa51

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

<<<<<<< HEAD
  constructor() { }
=======
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];


  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    activatedRoute.params
      .subscribe( params => {
        let termino = params['termino'];
        this.buscar(termino);
      })
  }
>>>>>>> b2fc80bef4e22a6c35bb23e99d63254ae411aa51

  ngOnInit() {
  }

<<<<<<< HEAD
=======
  buscar(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get(url)
      .subscribe( (resp: any) => {
        console.log(resp);
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
        this.usuarios = resp.usuarios;
      });
  }

>>>>>>> b2fc80bef4e22a6c35bb23e99d63254ae411aa51
}
