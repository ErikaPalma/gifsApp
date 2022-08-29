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
    query = query.trim().toLowerCase();
    //Para no incluir duplicados
    //Si no incluye la query, entonces inserta
    if (!this._historial.includes(query)) {
      //lo añado al inicio del array
      this._historial.unshift(query);
      //Cortar el array para limitar el historial a 10 resultados
      this._historial = this._historial.splice(0, 10);
    }
  }
}
