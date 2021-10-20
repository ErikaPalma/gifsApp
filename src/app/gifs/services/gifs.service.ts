import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apikey = 'c6vemWY8Vi2OwXvnV1t6tqr9JVCDM1oG';
  private servicioUrl = 'https://api.giphy.com/v1/gifs';
  // tslint:disable-next-line: variable-name
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  // tslint:disable-next-line: typedef
  get historial() {
    // Uso el spread para evitar una posible modificación del array original
    return [...this._historial];
  }
  constructor(private http: HttpClient) {
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial'));
      this.resultados = JSON.parse(localStorage.getItem('resultados'));
    }
  }

  // tslint:disable-next-line: typedef
  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      // voy añadiendo la última búsqueda al principio (query)
      this._historial.unshift(query);
      // corto el array para guardar únicamente 10 búsquedas
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    // Establecer parámetros en la url como lo hace postman
    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp: any) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
