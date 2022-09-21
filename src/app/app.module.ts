import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpenhoComponent } from './pages/empenho/empenho.component';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FornecedorComponent } from './pages/fornecedor/fornecedor.component';
import { AppbarComponent } from './components/appbar/appbar.component';
import { LoginComponent } from './pages/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgxMaskModule } from 'ngx-mask';
import { DndModule } from 'ngx-drag-drop';
import { NotasFiscaisComponent } from './pages/notas-fiscais/notas-fiscais.component';

const firebaseConfig = {
  apiKey: "AIzaSyBdsjLP8gQc55mQ1zaTjRlrPyXrHFmEbMg",
  authDomain: "gerencimento-empenhos.firebaseapp.com",
  projectId: "gerencimento-empenhos",
  storageBucket: "gerencimento-empenhos.appspot.com",
  messagingSenderId: "102892434415",
  appId: "1:102892434415:web:11074d691483cc1f90fc1a",
  measurementId: "G-0PD1VHLNSC"
};

@NgModule({
  declarations: [
    AppComponent,
    EmpenhoComponent,
    FornecedorComponent,
    AppbarComponent,
    LoginComponent,
    SidebarComponent,
    NotasFiscaisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    DndModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
