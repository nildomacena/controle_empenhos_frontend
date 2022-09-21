import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';
import { IEmpenho } from 'src/model/empenho.model';
import { IFornecedor } from 'src/model/fornecedor.model';
import { ITipoMovimentacao } from 'src/model/movimentacao.model';
import { EmpenhoService } from './empenho.service';
import { DndDropEvent } from 'ngx-drag-drop';

declare var $: any;
@Component({
  selector: 'app-empenho',
  templateUrl: './empenho.component.html',
  styleUrls: ['./empenho.component.scss']
})
export class EmpenhoComponent implements OnInit {
  empenhos: IEmpenho[] | undefined;
  fornecedores: IFornecedor[] | undefined;
  arquivoNE: File | undefined;
  empenhoSelecionado: IEmpenho | undefined;
  @ViewChild('labelImport')
  labelArquivoNE: ElementRef | undefined;
  formEmpenho: FormGroup;
  formMovimentacao: FormGroup;
  tiposMovimentacao: ITipoMovimentacao[] = [];

  constructor(
    private authService: AuthService,
    private empenhoService: EmpenhoService,
    private formBuilder: FormBuilder,
    private utilService: UtilService
  ) {
    this.getEmpenhos();
    this.empenhoService.getFornecedores().then((fornecedores) => {
      this.fornecedores = fornecedores;
      console.log(this.fornecedores)
    });
    this.empenhoService.getTiposMovimentacao().then((tipos) => {
      this.tiposMovimentacao = tipos;
      console.log(tipos)
    });

    this.formEmpenho = this.formBuilder.group({
      'numero': new FormControl('', [Validators.required]),
      'valor': new FormControl('', [Validators.required]),
      'descricao': new FormControl('', [Validators.required]),
      'fornecedor': new FormControl('', [Validators.required]),
      'arquivo': new FormControl(''),
    });

    this.formMovimentacao = this.formBuilder.group({
      'tipo': new FormControl('', [Validators.required]),
      'data': new FormControl('', [Validators.required]),
      'observacoes': new FormControl(''),
    });
  }

  getEmpenhos() {
    setTimeout(() => {
      this.empenhoService.getEmpenhosPendentes().then((empenhos) => {
        this.empenhos = empenhos;
      });
    }, 500);
  }

  ngOnInit(): void {
    $('#modalCadastro').on('shown.bs.modal', (e: any) => {
      this.labelArquivoNE!.nativeElement.innerText = 'Selecione o arquivo da NE';
      this.arquivoNE = undefined;
      console.log('abriu modal')
    });
    $('#modalUpdate').on('hidden.bs.modal', (e: any) => {
      this.empenhoSelecionado = undefined;
      console.log(this.empenhoSelecionado)
    });

    $('#modalUpdate').on('shown.bs.modal', (e: any) => {
      const date = new Date();
      this.formMovimentacao.patchValue({ data: this.utilService.formatDate(new Date()) });
      console.log(this.formMovimentacao);
    });

  }

  abrirModalCadastro() {
    $('#modalCadastro').modal({
      keyboard: false
    })
  }


  abrirModalAtualiza(empenho: IEmpenho) {
    this.empenhoSelecionado = empenho;
    $('#modalUpdate').modal({
      keyboard: false,
    })
  }

  async deletarEmpenho(empenho: IEmpenho) {
    if (!confirm('Deseja realmente cancelar esse empenho? ' + empenho.numero)) return;
    try {
      await this.empenhoService.deletarEmpenho(empenho);
      this.getEmpenhos();
    } catch (error) {
      alert('Ocorreu um erro durante o processo');
      console.error(error);
    }
  }


  onLogin() {
    this.authService.login();
  }

  onFileChange(event: any) {
    this.arquivoNE = event.target.files[0];
    this.labelArquivoNE!.nativeElement.innerText = this.arquivoNE!.name;
    console.log(this.arquivoNE);
  }

  async onSalvarEmpenho() {
    const fornecedor = this.fornecedores?.find((fornecedor) => fornecedor.id === +this.formEmpenho.value['fornecedor'])
    console.log(this.formEmpenho, fornecedor, this.arquivoNE)
    if (!fornecedor || this.formEmpenho.invalid || !this.arquivoNE) {
      alert('Formulário inválido!');
      return;
    }
    try {
      const data = { ... this.formEmpenho.value };
      const result = await this.empenhoService.salvarEmpenho(data.numero, data.descricao, fornecedor, data.valor, this.arquivoNE!);
      this.empenhos?.push(result);
      console.log(result);
      this.getEmpenhos();
      $('#modalCadastro').modal('hide');
    } catch (error) {
      console.error(error)
    }
  }

  downloadEmpenho(empenho: IEmpenho) {
    if (!empenho.url) return;
    window.open(empenho.url, '_blank');
  }

  onDragover(event:DragEvent) {

    console.log("dragover", JSON.stringify(event, null, 2));
  }

  onDrop(event:DndDropEvent) {

    console.log("dropped", JSON.stringify(event, null, 2));
  }


  async onSalvarMovimentacao() {
    if (this.formMovimentacao.invalid || !this.empenhoSelecionado) {
      alert('Formulário inválido');
      return;
    }
    try {
      console.log(this.formMovimentacao)
      const tipoMovimentacao = this.tiposMovimentacao.find((t) => t.id === +this.formMovimentacao.value['tipo'])
      if (!tipoMovimentacao) {
        alert('Nao encontrou tipo de movimentacao');
        return;
      }
      await this.empenhoService.salvarMovimentacao({
        tipoMovimentacao: tipoMovimentacao!,
        data: this.formMovimentacao.value['data'],
        observacoes: this.formMovimentacao.value['observacoes'],
        empenho: this.empenhoSelecionado
      });
      this.getEmpenhos();
      $('#modalUpdate').modal('hide');
    } catch (error) {
      alert('Ocorreu um erro');
      console.error(error);
    }

  }

}
