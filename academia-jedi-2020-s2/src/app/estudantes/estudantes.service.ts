import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { IEstudante } from "./estudante";
import { catchError, tap } from "rxjs/operators"

@Injectable({
    providedIn: 'root'
})
export class EstudantesService {

    private estudantesURL = '//localhost:8080/estudantesapi/estudantes';

    constructor(private http: HttpClient) { }

    getEstudantes(): Observable<IEstudante[]> {
        return this.http.get<IEstudante[]>(this.estudantesURL + '/todos').pipe(
            tap(dados => console.log('Todos: ' + JSON.stringify(dados))),
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