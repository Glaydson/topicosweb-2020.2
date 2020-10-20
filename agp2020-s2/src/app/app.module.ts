import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaProdutosComponent } from './produtos/lista-produtos.component';
import { RatingComponent } from './compartilhado/rating.component';
import { FormsModule } from '@angular/forms';
import { ConverteParaEspacoPipe } from './compartilhado/converte-para-espaco.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListaProdutosComponent,
    ConverteParaEspacoPipe,
    RatingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
