import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
    selector: 'gp-star',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnChanges{

    @Input() rating: number = 4;
    larguraEstrela: number;
    @Output() ratingClicado: EventEmitter<string> =  new EventEmitter<string>();

    ngOnChanges(): void {
        this.larguraEstrela = this.rating * 75/5;
    }

    onClick(): void {
        this.ratingClicado.emit(`O rating é ${this.rating}`);
    }

}