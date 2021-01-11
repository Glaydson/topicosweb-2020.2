import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEstudante } from './estudante';
import { EstudantesService } from './estudantes.service';

@Component({
  templateUrl: './estudante-detalhe.component.html',
  styleUrls: ['./estudante-detalhe.component.css']
})
export class EstudanteDetalheComponent implements OnInit {

  tituloPagina: string = "Detalhe do Estudante"
  estudante: IEstudante | undefined
  mensagemErro: string = ""

  constructor(private route: ActivatedRoute, private router: Router,
      private estudantesService: EstudantesService) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = param;
      this.getEstudante(id);
    }
  }
    
  getEstudante(id : string) {
    this.estudantesService.getEstudante(id).subscribe(
      estudante => this.estudante = estudante,
      error => this.mensagemErro = <any>error
    )
  }

  onVoltar(): void {
    this.router.navigate(['/estudantes']);  
  }  

}
