import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './bem-vindo.component.html'
})
export class BemVindoComponent implements OnInit {

  tituloPagina: string = "ACME Gerenciamento de Produtos";

  constructor() { }

  ngOnInit(): void {
  }

}
