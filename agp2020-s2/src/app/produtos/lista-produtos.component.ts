import { Component, OnInit } from '@angular/core';

import { IProduto } from './produto';

@Component({
    selector: "gp-produtos",
    templateUrl: "./lista-produtos.component.html",
    styleUrls:['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {
   
    tituloPagina: String = "Lista de Produtos";
    larguraImagem: number = 50;
    margemImagem: number = 2;
    exibirImagem: boolean = true;
    _filtroLista: string = 'carrinho';

    get filtroLista() : string {
      return this._filtroLista;
    }
    set filtroLista(valor: string) {
      this._filtroLista = valor;
      this.produtosFiltrados = this.filtroLista ? this.executarFiltro(this.filtroLista) : this.produtos;
    }

    produtosFiltrados: IProduto[];

    produtos: IProduto[] = [
        {
            "produtoId": 1,
            "nomeProduto": "Ancinho",
            "codigoProduto": "GDN-0011",
            "dataLancamento": "19 de Março, 2016",
            "descricao": "Ancinho com cabo de madeira de 48 polegadas.",
            "preco": 19.95,
            "rating": 3.2,
            "urlImagem": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
          },
          {
            "produtoId": 2,
            "nomeProduto": "Carrinho de Jardim",
            "codigoProduto": "GDN-0023",
            "dataLancamento": "18 de março, 2016",
            "descricao": "Carrinho de Jardim com capacidade de 56 litros",
            "preco": 32.99,
            "rating": 4.2,
            "urlImagem": "https://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
          },
          {
            "produtoId": 5,
            "nomeProduto": "Martelo",
            "codigoProduto": "TBX-0048",
            "dataLancamento": "21 de maio, 2016",
            "descricao": "Martelo de aço de garra curva",
            "preco": 8.9,
            "rating": 4.8,
            "urlImagem": "https://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
          },
          {
            "produtoId": 8,
            "nomeProduto": "Serra",
            "codigoProduto": "TBX-0022",
            "dataLancamento": "15 de Maio, 2016",
            "descricao": "Serra de mão com lâmina de aço de 15 polegadas",
            "preco": 11.55,
            "rating": 3.7,
            "urlImagem": "https://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
          },
          {
            "produtoId": 10,
            "nomeProduto": "Controle de Vídeo Game",
            "codigoProduto": "GMG-0042",
            "dataLancamento": "15 de outubro, 2015",
            "descricao": "Controle de vídeo game padrão com dois botões",
            "preco": 35.95,
            "rating": 4.6,
            "urlImagem": "https://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
          }
    ]

    constructor() {
      this.produtosFiltrados = this.produtos;
      this.filtroLista = 'carrinho';
    }

    ngOnInit(): void {
      console.log("Passei na inicialização do OnInit")
    }

    alternarImagem(): void {
      this.exibirImagem = !this.exibirImagem;
    }

    executarFiltro(filtrarPor: string): IProduto[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.produtos.filter((produto: IProduto) => 
        produto.nomeProduto.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
    }


}