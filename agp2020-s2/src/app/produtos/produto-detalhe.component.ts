import { Component, OnInit } from '@angular/core';
import { IProduto } from './produto';

@Component({
  templateUrl: './produto-detalhe.component.html',
})
export class ProdutoDetalheComponent implements OnInit {
  tituloPagina: string = "Detalhe do Produto"
  produto: IProduto;

  constructor() { }

  ngOnInit() {
  }
}
