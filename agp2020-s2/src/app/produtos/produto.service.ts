import { IProduto } from "./produto";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    deletarProduto(id: number) {
        throw new Error('Method not implemented.');
    }
    criarProduto(p: any) {
        throw new Error('Method not implemented.');
    }
    atualizarProduto(p: any) {
        throw new Error('Method not implemented.');
    }

    private produtoUrl = '//localhost:8080/produtosapi/produtos';

    constructor(private http: HttpClient) { }

    getProdutos(): Observable<IProduto[]> {
        return this.http.get<IProduto[]>(this.produtoUrl + '/todos'); 
    }

    getProduto(id: string): Observable<IProduto> {
      const url = `${this.produtoUrl}/${id}`;
      return this.http.get<IProduto>(url)
        .pipe(
          tap(data => console.log('getProduto: ' + JSON.stringify(data))),
          catchError(this.trataErro)
        );
    }

    private trataErro(erro: HttpErrorResponse) {
        // Em uma aplicação real, podemos enviar o erro para alguma infraestrutura
        // remota de log, ao invés de simplesmente enviar para o console
        let mensagemErro = '';
        if (erro.error instanceof ErrorEvent) {
          // Um erro no lado cliente ou de rede ocorreu. Tratar adequadamente
          mensagemErro = `Um erro ocorreu: ${erro.error.message}`;
        } else {
          // Back-end retornou um código de resposta de falha
          // O corpo da resposta pode conter dicas sobre o que deu errado
          mensagemErro = `Servidor retornou o código: ${erro.status}, a mensagem de erro é ${erro.message}`;
        }
        console.error(mensagemErro);
        return throwError(mensagemErro);
      }
    

}