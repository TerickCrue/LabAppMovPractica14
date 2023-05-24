import { Component, OnInit } from '@angular/core';
import { Calificacion } from '../interface/calificacion';
import { CalificacionServiceService } from '../service/calificacion-service.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.page.html',
  styleUrls: ['./calificaciones.page.scss'],
})
export class CalificacionesPage implements OnInit {

 
  calificaciones: Calificacion[] = [];
  calificacionesFiltradas: Calificacion[] = [];
  idEdicion: any;
  calificacionForm: FormGroup;
  estado: string = ''; 
  filtro: string = '';

  constructor(private formBuilder: FormBuilder, private califService: CalificacionServiceService)
  {
    this.calificacionForm = this.formBuilder.group({
      matricula: ['', Validators.required],
      materia: ['', Validators.required],
      calificacion: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      aprobado: [false, Validators.required],
    });
  }


  ngOnInit() {
    this.califService.setCalificaciones([
      { id: 1, matricula: '2026744', materia: 'Calculo Integral', calificacion: 90, aprobado: true },
      { id: 2, matricula: '2028172', materia: 'Algebra Lineal', calificacion: 65, aprobado: false },
      { id: 3, matricula: '2009174', materia: 'Bases de Datos', calificacion: 85, aprobado: true },
    ]);

    this.calificaciones = this.califService.getCalificaciones();
    this.estado ='agregar';
  }

  enviar() {
    if (this.calificacionForm.valid) {
      if(this.estado == 'agregar'){
        let newCalificacion: Calificacion = {
          id: this.califService.generateId(),
          matricula: this.calificacionForm.value.matricula,
          materia: this.calificacionForm.value.materia,
          calificacion: this.calificacionForm.value.calificacion,
          aprobado: this.calificacionForm.value.aprobado,
        };
        this.califService.agregarCalificacion(newCalificacion);
      }
      if(this.estado == 'editar'){
        let matricula = this.calificacionForm.value.matricula;
        let materia = this.calificacionForm.value.materia;
        let calificacion = this.calificacionForm.value.calificacion;
        let aprobado = this.calificacionForm.value.aprobado;

        let calificacionEditada: Calificacion = {
        id: this.idEdicion,
        matricula: matricula,
        materia: materia,
        calificacion: calificacion,
        aprobado: aprobado
      };

      this.califService.modificarCalificacion(this.idEdicion, calificacionEditada);
      this.estado = 'agregar'
    }
      this.calificacionForm.reset();
    } else {
      console.log('error al agregar alumno');
      // Mostrar mensajes de error o realizar alguna acción en caso de que el formulario sea inválido.
    }
  }

  eliminarCalificacion(id: number) {
    this.califService.eliminarCalificacion(id);
    this.calificaciones = this.califService.getCalificaciones();
  }

  editarCalificacion(idAEditar: number, calificacion: Calificacion){
    this.idEdicion = calificacion.id;
    this.calificacionForm.patchValue({
      matricula: calificacion.matricula,
      materia: calificacion.materia,
      calificacion: calificacion.calificacion,
      aprobado: calificacion.aprobado
    });

    this.estado = 'editar';
  }

  buscarCalificaciones(matricula: string | undefined): Calificacion[] {
    // Si la barra de búsqueda está vacía o no se ha proporcionado un valor, mostrar todas las calificaciones
    if (!matricula || matricula.trim() === '') {
      this.calificaciones = this.califService.getCalificaciones();
    } else {
      // Filtrar las calificaciones por matrícula
      this.calificacionesFiltradas = this.califService.getCalificacionesByMatricula(matricula);
    }

    return this.calificacionesFiltradas;
  }

}
