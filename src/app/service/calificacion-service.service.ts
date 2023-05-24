import { Injectable } from '@angular/core';
import { Calificacion } from '../interface/calificacion';

@Injectable({
  providedIn: 'root'
})
export class CalificacionServiceService {

  private calificaciones: Calificacion[] = [];

  constructor() { }

  
  getCalificaciones(): Calificacion[] {
    return this.calificaciones;
  }

  getCalificacionesByMatricula(matricula: string): Calificacion[] {
    return this.calificaciones.filter(calificacion => calificacion.matricula === matricula);
  }

  agregarCalificacion(calificacion: Calificacion){
    this.calificaciones.push(calificacion);
  }

  eliminarCalificacion(idEliminar: number): void {
    this.calificaciones = this.calificaciones.filter((calificacion => calificacion.id !== idEliminar));
  }

  modificarCalificacion(id:any, calificacion: Calificacion): void {
    const indice = this.calificaciones.findIndex(calif => calif.id === id);
    if (indice !== -1) {
      this.calificaciones[indice] = calificacion;
    }
  }

  public setCalificaciones(calificaciones: Calificacion[]){
    this.calificaciones = calificaciones;
  }

  generateId(): number{

    let ID: number = 0;

    if(this.calificaciones.length > 0){
      ID = this.calificaciones.length + 1; 
    }else{
      ID = 1;
    }

    return ID;
  }

}
