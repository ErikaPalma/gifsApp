import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  // tslint:disable-next-line: variable-name
  private _historial: string[] = [];

  // tslint:disable-next-line: typedef
  get historial() {
    // Uso el spread para evitar una posible modificación del array original
    return [...this._historial];
  }

  // tslint:disable-next-line: typedef
  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      // voy añadiendo la última búsqueda al principio (query)
      this._historial.unshift(query);
    }
    this._historial = this._historial.splice(0, 10);
    console.log(this._historial);
  }

  constructor() {}
}
