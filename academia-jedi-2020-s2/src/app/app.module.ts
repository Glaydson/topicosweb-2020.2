import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaEstudantesComponent } from './estudantes/lista-estudantes.component';
import { SexoPipe } from './compartilhado/sexo-pipe';
import { AlturaComponent } from './compartilhado/altura.component';
import { FormsModule } from '@angular/forms';
import { EstudanteDetalheComponent } from './estudantes/estudante-detalhe.component';
import { BemVindoComponent } from './home/bem-vindo.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ListaEstudantesComponent,
    SexoPipe,
    AlturaComponent,
    EstudanteDetalheComponent,
    BemVindoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'estudantes', component: ListaEstudantesComponent },
      { path: 'estudantes/:id', component: EstudanteDetalheComponent },
      { path: 'bemvindo', component: BemVindoComponent },
      { path: '', redirectTo: 'bemvindo', pathMatch: 'full'},
      { path: '**', redirectTo: 'bemvindo', pathMatch: 'full'}

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
