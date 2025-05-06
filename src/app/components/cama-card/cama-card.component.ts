import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cama-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cama-card.component.html',
  styleUrls: ['./cama-card.component.css']
})
export class CamaCardComponent {
  constructor(private http: HttpClient) {}

  @Input() nome!: string;
  @Input() status!: 'DISPONIVEL' | 'EM USO' | 'EM MANUTENCAO';
  @Input() colaborador?: string;
  @Input() tempoDeUso?: number;
  @Output() clicar = new EventEmitter<void>();
  @Input() sexoDormitorio!: string;
  @Output() clicarCama = new EventEmitter<void>();

  mostrarModal: boolean = false;
  sexoSelecionado: string = '';
  cracha: string = '';
  nomeColaborador: string = '';

  onClick() {
    this.clicarCama.emit();
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
    this.resetarCampos();
  }

  onAlterar(novoStatus: 'DISPONIVEL' | 'EM USO' | 'EM MANUTENCAO', ev: MouseEvent) {
    ev.stopPropagation();

    if (novoStatus === 'EM USO') {
      this.abrirModal();
    } else {
      if (this.status === 'EM USO') {
        const confirmacao = confirm('O colaborador ainda não terminou o descanso de 1 hora. Tem certeza que deseja continuar?');
        if (!confirmacao) return;
      }
      this.atualizarStatus(novoStatus);
    }
  }

  atualizarStatus(novoStatus: 'DISPONIVEL' | 'EM USO' | 'EM MANUTENCAO') {
    this.status = novoStatus;
    if (novoStatus !== 'EM USO') {
      this.colaborador = undefined;
      this.tempoDeUso = undefined;
    }
    this.resetarCampos();
  }

  buscarColaboradorPorCracha() {
    if (!this.cracha) return;
  
    this.http.get<any>(`http://localhost:8080/api/colaboradores/cracha/${this.cracha.trim()}`)
      .subscribe({
        next: (colaborador) => {
          const sexoCama = (this.sexoDormitorio || '').toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          const sexoColab = (colaborador.sexo || '').toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
          const camaMasculina = sexoCama === 'MASCULINO';
          const camaFeminina = sexoCama === 'FEMININO';
  
          const sexoIncompativel = 
            (camaMasculina && sexoColab !== 'MASCULINO') ||
            (camaFeminina && sexoColab !== 'FEMININO');
  
          if (sexoIncompativel) {
            alert(`Sexo incompatível com a cama selecionada!\nEsperado: ${sexoCama}, Recebido: ${sexoColab}`);
            this.resetarCampos();
            return;
          }
  
          this.nomeColaborador = colaborador.nome;
          this.sexoSelecionado = colaborador.sexo;
        },
        error: () => {
          alert('Colaborador não encontrado!');
          this.resetarCampos();
        }
      });
  }
  

  confirmarVinculo() {
    if (!this.nomeColaborador || !this.cracha || !this.sexoSelecionado) {
      alert('Preencha corretamente todos os campos!');
      return;
    }

    this.colaborador = this.nomeColaborador;
    this.status = 'EM USO';
    this.tempoDeUso = 0;
    this.fecharModal();
  }

  cancelar() {
    this.fecharModal();
  }

  private resetarCampos() {
    this.sexoSelecionado = '';
    this.cracha = '';
    this.nomeColaborador = '';
  }
}
