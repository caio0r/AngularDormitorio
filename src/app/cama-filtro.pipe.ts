import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camaFiltro',
  standalone: true,
})
export class CamaFiltroPipe implements PipeTransform {
  transform(camas: any[], filtro: string): any[] {
    if (!camas) return [];

    if (filtro === 'TODAS') {
      return camas;
    }

    return camas.filter(cama => cama.sexoDormitorio === filtro);
  }
}
