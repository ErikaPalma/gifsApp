import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gif, SearchGifsResponse } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'c6vemWY8Vi2OwXvnV1t6tqr9JVCDM1oG';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial() {
    // Rompo la referencia al original y devuelve un nuevo array
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();
    // Para no incluir duplicados
    // Si no incluye la query, entonces inserta
    if (!this._historial.includes(query)) {
      // lo añado al inicio del array
      this._historial.unshift(query);
      // Cortar el array para limitar el historial a 10 resultados
      this._historial = this._historial.splice(0, 10);

      // Local Storage
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    this.http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10'`
      )
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
      });
  }

  /* getResultados() {
    return this.http.get<SearchGifsResponse>(
      `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10'`
    );
  } */
}
