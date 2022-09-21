import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { API_URL } from 'src/constants';
import { IFornecedor } from 'src/model/fornecedor.model';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(private apiService: ApiService) {

  }

  getFornecedores(): Promise<IFornecedor[]> {
    return this.apiService.get<IFornecedor[]>({ url: '/fornecedores' });
  }

  salvarFornecedor(params: { nome: string, cnpj: string, telefone: string, email: string }): Promise<any> {
    return this.apiService.post<IFornecedor>({ url: '/fornecedores', body: params });
  }

  updateFornecedor(params: { fornecedor: IFornecedor, nome: string, cnpj: string, telefone: string, email: string }) {
    const { nome, cnpj, telefone, email } = params;
    return this.apiService.patch({ url: `/fornecedores/${params.fornecedor.id}`, body: { nome, cnpj, telefone, email } });
  }
}
