import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamaCardComponent } from '../../components/cama-card/cama-card.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CamaFiltroPipe } from '../../cama-filtro.pipe';
import { CamaService } from '../../services/cama.service';
import { CadastroColaboradoresComponent } from '../../components/cadastro-colaboradores/cadastro-colaboradores.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CamaCardComponent, CamaFiltroPipe, NavbarComponent,CadastroColaboradoresComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  camas: any[] = [];
  filtro: string = 'M'; // <- Use 'M' aqui (conforme o pipe espera)

  constructor(private camaService: CamaService) {}

  ngOnInit() {
    this.buscarCamas();
  }

  buscarCamas() {
    this.camaService.getCamas().subscribe({
      next: (data) => {
        this.camas = data.map(c => {
          let sexoDorm: 'MASCULINO' | 'FEMININO' | 'POLTRONA' = 'MASCULINO';
          if (c.codigo?.startsWith('FEM')) sexoDorm = 'FEMININO';
          else if (c.codigo?.startsWith('POL')) sexoDorm = 'POLTRONA';

          return {
            numero: c.codigo,
            status: c.status,
            colaborador: c.colaborador ?? '',
            tempoDeUso: c.tempo_de_uso ?? 0,
            sexoDormitorio: sexoDorm
          };
        });

        this.filtro = 'M'; // <- Garante filtro correto após carregar
      },
      error: (error) => {
        console.error('Erro ao buscar camas', error);
      }
    });
  }

  abrirAlterarStatus(index: number) {
    const camaSelecionada = this.camas[index];
    console.log('Cama clicada:', camaSelecionada);
    // Aqui você pode abrir um modal, etc.
  }
}
