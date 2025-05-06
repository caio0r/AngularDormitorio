import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camaFiltro',
  standalone: true
})
export class CamaFiltroPipe implements PipeTransform {
  transform(camas: any[], filtro: string): any[] {
    if (!camas || !filtro) return camas;

    return camas.filter(cama => {
      const tipo = (cama?.sexoDormitorio || '').toUpperCase(); // previne erro de undefined
      switch (filtro) {
        case 'M':
          return tipo === 'MASCULINO';
        case 'F':
          return tipo === 'FEMININO';
        case 'P':
          return tipo === 'POLTRONA';
        default:
          return true; // Retorna todas se filtro for desconhecido
      }
    });
  }
}
