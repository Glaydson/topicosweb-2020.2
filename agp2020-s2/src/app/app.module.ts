import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaProdutosComponent } from './produtos/lista-produtos.component';
import { RatingComponent } from './compartilhado/rating.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConverteParaEspacoPipe } from './compartilhado/converte-para-espaco.pipe';
import { ProdutoDetalheComponent } from './produtos/produto-detalhe.component';
import { BemVindoComponent } from './home/bem-vindo.component';
import { RouterModule } from '@angular/router';
import { ProdutoDetalheGuard } from './produtos/produto-detalhe.guard';
import { EditarProdutoComponent } from './produtos/editar-produto.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaProdutosComponent,
    ConverteParaEspacoPipe,
    RatingComponent,
    ProdutoDetalheComponent,
    BemVindoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'produtos', component: ListaProdutosComponent },
      { path: 'produtos/:id', 
        canActivate: [ProdutoDetalheGuard], component: ProdutoDetalheComponent },
      { path: 'produtos/:id/editar', component: EditarProdutoComponent },
      { path: 'bemvindo', component: BemVindoComponent },
      { path: '', redirectTo: 'bemvindo', pathMatch: 'full'},
      { path: '**', redirectTo: 'bemvindo', pathMatch: 'full'}
    ]),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
