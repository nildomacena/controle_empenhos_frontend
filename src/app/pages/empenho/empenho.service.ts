import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { firstValueFrom, retry } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { API_URL } from 'src/constants';
import { IEmpenho } from 'src/model/empenho.model';
import { IFornecedor } from 'src/model/fornecedor.model';
import { ITipoMovimentacao } from 'src/model/movimentacao.model';
import { INotaFiscal } from 'src/model/notaFiscal.model';

@Injectable({
  providedIn: 'root'
})
export class EmpenhoService {
  httpOptions: Object;
  baseUrl = API_URL;
  constructor(
    private storage: AngularFireStorage,
    private http: HttpClient,
    private apiService: ApiService,
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  async getEmpenhosPendentes(): Promise<IEmpenho[]> {
    return this.apiService.get<IEmpenho[]>({ url: '/empenhos' });
  }

  async deletarEmpenho(empenho: IEmpenho) {
    return this.apiService.delete({ url: `/empenhos/${empenho.id}` });
  }

  async getFornecedores(): Promise<IFornecedor[]> {
    const get = this.http.get<IFornecedor[]>(`${this.baseUrl}/fornecedores`, this.httpOptions);
    return firstValueFrom(get);
  }

  async getTiposMovimentacao() {
    return this.apiService.get<ITipoMovimentacao[]>({ url: '/movimentacao-tipos' });
  }

  async salvarEmpenho(numero: string, descricao: string, fornecedor: IFornecedor, valor: number, arquivo: File,): Promise<any> {
    console.log('salvar empeenho');
    let url: string = '';
    await this.storage.ref(`empenhos/${numero}`).put(arquivo).then(async (snapshot) => {
      url = await snapshot.ref.getDownloadURL()
    });
    if (!url) throw 'Erro ao salvar arquivo';
    console.log('salvou url: $url');
    return this.http
      .post<IEmpenho>(
        this.baseUrl + '/empenhos/',
        JSON.stringify({
          numero,
          descricao,
          fornecedor,
          valor,
          url,
          data: new Date().toISOString()
        }),
        this.httpOptions
      ).pipe(retry(1)).subscribe((value) => {
        console.log('on value', value);
      });
  }

  salvarMovimentacao(params: { tipoMovimentacao: ITipoMovimentacao, data: Date, observacoes: string, empenho: IEmpenho }) {
    const { tipoMovimentacao, data, observacoes, empenho } = params;
    console.log(params);
    return this.apiService.post({ url: '/movimentacoes', body: { tipoMovimentacao, data, observacoes, empenho } });
  }
}
