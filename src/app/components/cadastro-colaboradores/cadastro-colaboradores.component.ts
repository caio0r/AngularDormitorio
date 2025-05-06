import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColaboradorService, Colaborador } from '../../services/colaborador.service.ts.service'; // ajuste o caminho conforme necessário

@Component({
  selector: 'app-cadastro-colaboradores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-colaboradores.component.html',
  styleUrls: ['./cadastro-colaboradores.component.css']
})
export class CadastroColaboradoresComponent {
  colaborador: Colaborador = {
    nome: '',
    sexo: '',
    matricula: '',
    setor: '',
    cracha: ''
  };

  mostrarFormulario = false;

  constructor(private colaboradorService: ColaboradorService) {}

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  cadastrar() {
    this.colaboradorService.cadastrar(this.colaborador).subscribe({
      next: response => {
        console.log('Colaborador salvo com sucesso!', response);
        alert('Colaborador cadastrado com sucesso!');
        this.mostrarFormulario = false;
        this.colaborador = { nome: '', sexo: '', matricula: '', setor: '', cracha: '' };
      },
      error: err => {
        console.error('Erro ao cadastrar colaborador:', err);
        alert('Erro ao cadastrar colaborador.');
      }
    });
  }
}
