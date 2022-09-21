import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { EmpenhoComponent } from './pages/empenho/empenho.component';
import { FornecedorComponent } from './pages/fornecedor/fornecedor.component';
import { LoginComponent } from './pages/login/login.component';
import { NotasFiscaisComponent } from './pages/notas-fiscais/notas-fiscais.component';

const routes: Routes = [
  { path: '', component: EmpenhoComponent, canActivate: [AuthGuard] },
  { path: 'empenhos', component: EmpenhoComponent, canActivate: [AuthGuard] },
  { path: 'fornecedores', component: FornecedorComponent, canActivate: [AuthGuard] },
  { path: 'notas-fiscais', component: NotasFiscaisComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
