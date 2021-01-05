import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { IProduto } from './produto';
import { ProdutoService } from './produto.service';
import { NumberValidators } from '../compartilhado/number-validator';
import { GenericValidator } from '../compartilhado/generic-validator';
import { debounceTime } from 'rxjs/operators';

@Component({
    templateUrl: "./editar-produto.component.html",
})
export class EditarProdutoComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    tituloPagina = 'Edição de Produto';
    errorMessage: string;
    formProduto: FormGroup;

    produto: IProduto;
    private sub: Subscription;

    // Para uso com a classe genérica de mensagens de validação
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private fb: FormBuilder,
        private rota: ActivatedRoute,
        private roteador: Router,
        private servicoProdutos: ProdutoService) {
        this.validationMessages = {
            nomeProduto: {
                required: 'O nome do produto é obrigatório.',
                minlength: 'O nome do produto precisa ter pelo menos três caracteres.',
                maxlength: 'O nome do produto não pode exceder 50 caracteres.'
            },
            codigoProduto: {
                required: 'O código do produto é obrigatório.'
            },
            preco: {
                required: 'O preço do produto é obrigatório.',
                min: 'O preço do produto tem que ser um valor positivo.'
            },
            rating: {
                faixa: 'Avalie o produto entre 1 (mínimo) e 5 (máximo).'
            }
        };
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.formProduto = this.fb.group({
            nomeProduto: ['', [Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)]],
            codigoProduto: ['', Validators.required],
            dataLancamento: '',
            preco: ['', [Validators.required,
            Validators.min(0)]],
            rating: ['', NumberValidators.faixa(1, 5)],
            descricao: ''
        });
        // Lê o id do produto a partir da rota
        this.sub = this.rota.paramMap.subscribe(
            params => {
                const id = params.get('id');
                this.getProduto(id);
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        const controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

        merge(this.formProduto.valueChanges, ...controlBlurs).pipe(
            debounceTime(800)
        ).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.formProduto);
        });
    }

    getProduto(id: string): void {
        this.servicoProdutos.getProduto(id)
          .subscribe({
            next: (produto: IProduto) => this.exibeProduto(produto),
            error: err => this.errorMessage = err
          });
    }

    exibeProduto(produto: IProduto): void {
        if (this.formProduto) {
          this.formProduto.reset();
        }
        this.produto = produto;
    
        if (this.produto.id === 0) {
          this.tituloPagina = 'Adicionar Produto';
        } else {
          this.tituloPagina = `Editar Produto: ${this.produto.nomeProduto}`;
        }
    
        // Atualiza os dados do formulário
        this.formProduto.patchValue({
          nomeProduto: this.produto.nomeProduto,
          codigoProduto: this.produto.codigoProduto,
          dataLancamento: this.produto.dataLancamento,
          preco: this.produto.preco,
          rating: this.produto.rating,
          descricao: this.produto.descricao
        });
      }

      deletarProduto(): void {
        if (this.produto.id === 0) {
          // Não remove, pois nunca foi salvo
          this.onSaveComplete();
        } else {
          if (confirm(`Remover o produto: ${this.produto.nomeProduto}?`)) {
            this.servicoProdutos.deletarProduto(this.produto.id)
              .subscribe({
                next: () => {
                  alert("Produto removido. Clique para voltar à lista");
                  this.onSaveComplete();
                },
                error: err => this.errorMessage = err,
              });
          }
        }
      }

    onSaveComplete(): void {
        this.formProduto.reset();
        this.roteador.navigate(['/produtos']);
    }
    
    salvarProduto(): void {
        if (this.formProduto.valid) {
          if (this.formProduto.dirty) {
            const p = { ...this.produto, ...this.formProduto.value };
            if (p.id === 0) {
              this.servicoProdutos.criarProduto(p)
                .subscribe({
                  next: () => {
                    alert("Produto criado. Clique para voltar à lista")
                    this.onSaveComplete()
                  },
                  error: err => this.errorMessage = err
                });
            } else {
              this.servicoProdutos.atualizarProduto(p)
                .subscribe({
                  next: () => this.onSaveComplete(),
                  error: err => this.errorMessage = err
                });
            }
          } else {
            this.onSaveComplete();
          }
        } else {
          this.errorMessage = 'Por favor corrija os erros de validação.';
        }
      }



}