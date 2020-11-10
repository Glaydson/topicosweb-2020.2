import { Component, OnInit } from '@angular/core';

import { IProduto } from './produto';
import { ProdutoService } from './produto.service'

@Component({
  selector: "gp-produtos",
  templateUrl: "./lista-produtos.component.html",
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  tituloPagina: String = "Lista de Produtos";
  larguraImagem: number = 50;
  margemImagem: number = 2;
  exibirImagem: boolean = true;
  _filtroLista: string = 'carrinho';

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(valor: string) {
    this._filtroLista = valor;
    this.produtosFiltrados = this.filtroLista ? this.executarFiltro(this.filtroLista) : this.produtos;
  }

  produtosFiltrados: IProduto[];

  produtos: IProduto[] = []

  constructor(private produtoServico: ProdutoService) {
  }

  ngOnInit() {
    this.produtos = this.produtoServico.getProdutos();
    this.produtosFiltrados = this.produtos;
  }


  alternarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  executarFiltro(filtrarPor: string): IProduto[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.produtos.filter((produto: IProduto) =>
      produto.nomeProduto.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }

  onRatingClicado(mensagem: string): void {
    this.tituloPagina = "Lista de Produtos - " + mensagem;
  }


}