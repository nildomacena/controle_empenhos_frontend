import { Component, OnInit, NgZone } from '@angular/core';
import { IEmpenho } from 'src/model/empenho.model';
import { EmpenhoService } from '../empenho/empenho.service';

@Component({
  selector: 'app-notas-fiscais',
  templateUrl: './notas-fiscais.component.html',
  styleUrls: ['./notas-fiscais.component.scss']
})
export class NotasFiscaisComponent implements OnInit {

  empenhos: IEmpenho[] = [];
  constructor(private readonly empenhoService: EmpenhoService, private zone: NgZone) {
    this.empenhoService.getEmpenhosPendentes().then((empenhos) => { zone.run(() => {this.empenhos = empenhos; console.log(this.empenhos)}) });
  }

  ngOnInit(): void {
  }

}
