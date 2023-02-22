import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  /*Consumo de Api*/
  private apikey     : string = 'name=rick&status=alive';
  private servicioUrl: string = 'https://rickandmortyapi.com/api/character'; 
  private _historial : string[] = [];
  //TODO: Cambiar any por un tipo 
  public resultados  : any [] = [];

  get historial(){
    return [...this._historial];
  }

  /*Inyeccion de servicio*/
  constructor (private http : HttpClient){  
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  } 

  buscarGifs (query : string = ''){
   
    query = query.trim().toLocaleLowerCase();
    
    /* Si se encuentra no se inserta y si no insertalo*/
    if(!this._historial.includes(query)){
      
      this._historial.unshift(query);
      /* REaliza que solo se muestran 10 Vistas de las muchas que podemos ingresar*/
      this._historial = this._historial.splice(0,10);
      /*LocalStorge => permite almacenar datos en el navegador web. Y que estos persistan y estén disponibles 
        durante la navegación en la aplicación web, hasta que esta información sea borrada del navegador.*/
      localStorage.setItem('historial', JSON.stringify(this._historial)); 
    }

    /*HttpParams => permite pasar parámetros con la solicitud HttpClient en angular.*/
      /* Nuevos declaraciones para nombrar los datos para tomarlos mas rapido */
    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit',   '10')
      .set('q',       query);

    /* Imprime en Consola "params"*/ 
    console.log(params.toString());

    
    /*Observavos -- peticion de la api */
    this.http.get(`https://rickandmortyapi.com/api/character`)
   //this.http.get(`${ this.servicioUrl}/search`, {params})   /*Este si funciona solo que como no tennemos la Api Key de la Api no se puede implementar pero aun asi funcina la peticion*/
          .subscribe( (resp: any ) => {
          console.log(resp.results);
          this.resultados = resp.results;
          localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
