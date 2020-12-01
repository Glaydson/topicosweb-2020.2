import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduto } from './produto';
import { ProdutoService } from './produto.service';

@Component({
  templateUrl: './produto-detalhe.component.html',
})
export class ProdutoDetalheComponent implements OnInit {
  tituloPagina: string = "Detalhe do Produto"
  produto: IProduto | undefined;
  mensagemErro: string;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private produtoService: ProdutoService) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = param;
      this.getProduto(id);
    }
  }

  getProduto(id: string) {
    this.produtoService.getProduto(id).subscribe(
      produto => this.produto = produto,
      error => this.mensagemErro = <any>error
    )
  } 

  onVoltar(): void {
    this.router.navigate(['/produtos']);
  }
}
