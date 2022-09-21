import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  formatDate(date: Date): string {
    const dia = date.getDay();
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();
    return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;

  }
}
