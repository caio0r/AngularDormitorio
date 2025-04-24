import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamaCardComponent } from '../../components/cama-card/cama-card.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CamaFiltroPipe } from '../../cama-filtro.pipe'; // Importar o Pipe

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CamaCardComponent, CamaFiltroPipe, NavbarComponent], // Adicionar o Pipe
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  camas = [
    {
      numero: 'Cama M01',
      status: 'DISPONIVEL' as const,
      sexoDormitorio: 'M' // Masculino
    },
    {
      numero: 'Cama M02',
      status: 'EM MANUTENCAO' as const,
      sexoDormitorio: 'M'
    },
    {
      numero: 'Cama F01',
      status: 'EM USO' as const,
      colaborador: 'Caio',
      tempoDeUso: 45,
      sexoDormitorio: 'F' // Feminino
    }
  ];
  
  filtro: string = 'TODAS'; // Começa mostrando todas

  abrirAlterarStatus(index: number) {
    const camaSelecionada = this.camas[index];
    console.log('Cama clicada:', camaSelecionada);

    // Aqui futuramente vamos abrir um modal para alterar status, vincular colaborador, etc.
  }
}
