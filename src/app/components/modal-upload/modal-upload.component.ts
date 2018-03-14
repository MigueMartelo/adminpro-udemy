import { Component, OnInit } from '@angular/core';
import { SubirArchivosService } from '../../services/services.index';
import { ModalUploadService } from './modal-upload.service';

declare const swal:any;

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

	imagenSubir: File;
	imagenTemp: string;

  constructor(
  	public _subirArchivosService: SubirArchivosService,
  	public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
  }

  subirImagen() {
  	this._subirArchivosService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
        .then( resp => {          
          this._modalUploadService.notificacion.emit(resp);
          this.cerrarModal();          
        })
        .catch( err => {
          console.log('Error en la carga...');
        })
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }

  seleccionImagen(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Sólo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

}
