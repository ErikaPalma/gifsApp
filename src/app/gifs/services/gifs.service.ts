import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apikey: string = 'c6vemWY8Vi2OwXvnV1t6tqr9JVCDM1oG';
  // tslint:disable-next-line: variable-name
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  // tslint:disable-next-line: typedef
  get historial() {
    // Uso el spread para evitar una posible modificación del array original
    return [...this._historial];
  }
  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      // voy añadiendo la última búsqueda al principio (query)
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this.http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=c6vemWY8Vi2OwXvnV1t6tqr9JVCDM1oG&q=${query}&limit=10`
      )
      .subscribe((resp: any) => {
        console.log(resp.data);
        this.resultados = resp.data;
      });
  }
}
