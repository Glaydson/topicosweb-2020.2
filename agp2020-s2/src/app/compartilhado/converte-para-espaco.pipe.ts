import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'converteParaEspaco'
})
export class ConverteParaEspacoPipe implements PipeTransform {
    
    transform(valor: string, caractere: string): string {
        return valor.replace(caractere, ' ');
    }

}