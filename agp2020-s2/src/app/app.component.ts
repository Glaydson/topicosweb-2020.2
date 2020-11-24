import { Component } from '@angular/core';

@Component({
  selector: 'gp-root',
  template: `
    <nav class='navbar navbar-expand navbar-light bg-light'>
      <a class='navbar-brand'>{{titulo}}</a>
      <ul class='nav nav-pills'>
        <li><a class='nav-link' [routerLink] ="['/bemvindo']">Home</a></li>
        <li><a class='nav-link' [routerLink] ="['/produtos']">Lista de Produtos</a></li>
      </ul>
    </nav>
    <div class='container'>
        <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titulo = 'ACME Gerenciamento de Produtos';
}
