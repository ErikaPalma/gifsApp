import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _historial: string[] = [];

  get historial() {
    // Uso el spread para evitar una posible modificación del array original
    return [...this._historial];
  }

  buscarGifs(query: string) {
    //voy añadiendo al principio las búsquedas (query)
    this._historial.unshift(query);
    console.log(this._historial);
  }

  constructor() {}
}
