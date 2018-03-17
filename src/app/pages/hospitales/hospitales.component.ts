import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/services.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
          .subscribe(() => this.cargarHospitales());
  }

  buscarHospital(termino: string){
    if(termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospitales(termino)
          .subscribe(hospitales => this.hospitales = hospitales);
  }

  cargarHospitales(){
    this.cargando = true;
    this._hospitalService.cargarHospitales()
            .subscribe( (resp:any) => {
              this.totalRegistros = resp.total;
              this.hospitales = resp.hospitales;
              this.cargando = false;
            });
  }

  crearHospital(hospital: Hospital){
    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      content: "input",
      icon: 'info',
      buttons: true,
      dangerMode: true
    })
    .then((nombre: string) => {

      if(!nombre || nombre.length === 0){
        return;
      }

      this._hospitalService.guardarHospital(nombre)
              .subscribe(hospital => {
                swal('Hospital Creado', 'Hospital creado correctamente!', 'success');
                this.cargarHospitales();
              });
    });
  }

  borrarHospital(hospital: Hospital){
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de eliminar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar => {
      if (borrar ){
        this._hospitalService.borrarHospital(hospital._id)
              .subscribe( borrado => {
                this.cargarHospitales();
              });
      }
    });
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
            .subscribe(
              swal('Hospital Actualizado', 'Hospital guardado correctamente!', 'success')
            );
  }

  actualizarImagen( hospital: Hospital){
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }

}
