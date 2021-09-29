import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  // tslint:disable-next-line: typedef
  get historial() {
    return this.gifsService.historial;
  }

  constructor(private gifsService: GifsService) {}

  ngOnInit(): void {}
}
