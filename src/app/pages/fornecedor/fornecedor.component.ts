import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IFornecedor } from 'src/model/fornecedor.model';
import { FornecedorService } from './fornecedor.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent implements OnInit {
  fornecedores: IFornecedor[] = [];
  fornecedorSelecionado: IFornecedor | undefined;
  formFornecedor: FormGroup;
  salvando: boolean = false;

  constructor(private service: FornecedorService, private formBuilder: FormBuilder) {
    this.formFornecedor = this.formBuilder.group({
      'nome': new FormControl('', [Validators.required]),
      'cnpj': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'telefone': new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getFornecedores()
  }


  async getFornecedores() {
    try {
      this.fornecedores = await this.service.getFornecedores();
      console.log(this.fornecedores);
    } catch (error) {
      console.error(error);

    }
  }

  consolee() {

  }

  async submitForm() {
    console.log(this.formFornecedor)
    if (this.formFornecedor.invalid) {
      alert('Formulário inválido');
      return;
    }

    if (this.fornecedorSelecionado) this.atualizarFornecedor();
    else this.criarFornecedor();

  }

  async atualizarFornecedor() {
    try {
      if (!this.fornecedorSelecionado) {
        alert('Erro ao atualizar cadastro');
        return;
      }
      const { nome, cnpj, telefone, email } = this.formFornecedor.value;
      await this.service.updateFornecedor({ fornecedor: this.fornecedorSelecionado, nome, cnpj, telefone, email });
      this.getFornecedores();
      this.formFornecedor.reset();
    } catch (error) {
      alert('Ocorreu um erro durante o processo');
      console.error(error);
    }
  }

  async criarFornecedor() {
    try {
      await this.service.salvarFornecedor(this.formFornecedor.value);
      this.getFornecedores();
      this.formFornecedor.reset();
    } catch (error) {
      alert('Ocorreu um erro durante o processo');
      console.error(error);
    }
  }

  deletarFornecedor() { }

  onSelectFornecedor(fornecedor: IFornecedor) {
    this.fornecedorSelecionado = this.fornecedorSelecionado == fornecedor ? undefined : fornecedor;
    if (this.fornecedorSelecionado) {
      this.formFornecedor.patchValue({
        'nome': this.fornecedorSelecionado.nome,
        'cnpj': this.fornecedorSelecionado.cnpj,
        'telefone': this.fornecedorSelecionado.telefone,
        'email': this.fornecedorSelecionado.email,
      })
    }
    else {
      this.formFornecedor.reset();
    }
  }

}
