import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sexoAbreviado'
})
export class SexoPipe implements PipeTransform {

    transform(valor: string): string {
        if (valor === "masculino") return "M"
        else if (valor === "feminino") return "F"
        else return valor;
    }
}
