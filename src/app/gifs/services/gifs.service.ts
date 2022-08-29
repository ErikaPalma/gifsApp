import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _historial: string[] = [];

  get historial() {
    //Rompo la referencia al original y devuelve un nuevo array
    return [...this._historial];
  }

  buscarGifs(query: string) {
    //lo añado al inicio del array
    this._historial.unshift(query);
    console.log(this._historial);
  }
}
