import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  get historial(){
    return this.gifsService.historial;
  }

  constructor (private gifsService : GifsService){  }
  /* CUIDADO CON LAS MAYUSCULAS*/  
  buscar(termino : string){
    /*Para la busqueda especifica de cada elemento, solo se llam al servicio ya que ya se tiene
      la funcion donde se hace la busqueda*/
    this.gifsService.buscarGifs(termino);
    
    }
}
