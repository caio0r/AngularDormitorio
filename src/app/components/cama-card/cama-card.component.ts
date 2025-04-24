import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 👈 Importado

@Component({
  selector: 'app-cama-card',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cama-card.component.html',
  styleUrls: ['./cama-card.component.css']
})
export class CamaCardComponent {
  @Input() nome!: string;
  @Input() status!: 'DISPONIVEL' | 'EM USO' | 'EM MANUTENCAO';
  @Input() colaborador?: string;
  @Input() tempoDeUso?: number;
  @Output() clicar = new EventEmitter<void>();
  @Input() sexoDormitorio!: string; // Receber a informação de M ou F


  mostrarBigBox: boolean = false;
  sexoSelecionado: string = '';
  cracha: string = '';
  nomeColaborador: string = '';
  mostrarModal: boolean = false;

abrirModal() {
  this.mostrarModal = true;
}

fecharModal() {
  this.mostrarModal = false;
}

alterarStatus(novoStatus: 'DISPONIVEL' | 'EM USO' | 'EM MANUTENCAO') {
  if (novoStatus === 'EM USO') {
    this.abrirModal();
  } 
  else {
    if (this.status === 'EM USO') {
      const confirmacao = confirm('O colaborador ainda não terminou o descanso de 1 hora. Tem certeza que deseja continuar?');
      if (!confirmacao) {
        return; // se o usuário clicar em "Cancelar", não faz nada
      }
    }

    this.status = novoStatus;
    this.colaborador = undefined;
    this.tempoDeUso = undefined;
    this.resetarCampos();
  }
}

buscarColaboradorPorCracha() {
  const colaboradoresFake: { [key: string]: { nome: string; sexo: 'M' | 'F' } } = {
    '123': { nome: 'João Silva', sexo: 'M' },
    '456': { nome: 'Maria Souza', sexo: 'F' },
    '789': { nome: 'Carlos Pereira', sexo: 'M' }
  };

  const colaborador = colaboradoresFake[this.cracha];

  if (!colaborador) {
    alert('Colaborador não encontrado!');
    this.nomeColaborador = '';
    this.sexoSelecionado = '';
    return;
  }

  // SEXO do dormitório (não pelo nome da cama)
  const camaMasculina = this.sexoDormitorio === 'M';
  const camaFeminina = this.sexoDormitorio === 'F';

  const sexoIncompativel = (camaMasculina && colaborador.sexo === 'F') || 
                          (camaFeminina && colaborador.sexo === 'M');

  if (sexoIncompativel) {
    alert('Sexo incompatível com a cama selecionada!');
    this.nomeColaborador = '';
    this.sexoSelecionado = '';
    return;
  }

  this.nomeColaborador = colaborador.nome;
  this.sexoSelecionado = colaborador.sexo;
}



confirmarVinculo() {
  if (!this.nomeColaborador || this.nomeColaborador === 'Colaborador não encontrado' || !this.cracha || !this.sexoSelecionado) {
    alert('Preencha corretamente todos os campos!');
    return;
  }

  // SEXO do dormitório (não pelo nome da cama)
  const camaMasculina = this.sexoDormitorio === 'M';
  const camaFeminina = this.sexoDormitorio === 'F';

  if (camaMasculina && this.sexoSelecionado === 'F') {
    alert('Esta cama é para uso masculino. Selecione um colaborador masculino.');
    return;
  }

  if (camaFeminina && this.sexoSelecionado === 'M') {
    alert('Esta cama é para uso feminino. Selecione uma colaboradora feminina.');
    return;
  }

  this.colaborador = this.nomeColaborador;
  this.status = 'EM USO';
  this.tempoDeUso = 0;
  this.mostrarBigBox = false;
  this.fecharModal();
}


  cancelar() {
    this.mostrarBigBox = false;
    this.resetarCampos();
  }

  private resetarCampos() {
    this.sexoSelecionado = '';
    this.cracha = '';
    this.nomeColaborador = '';
  }
}
