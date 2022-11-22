import { mesesVacios, parsearObjeto } from '.';
import { Caja, GrupoCaja } from '../models';

export const agruparCajas = (cajas: any[], grupoCajas: GrupoCaja[]) => {
  //modificar cajas para tree list
  const cajasModificadas = cajas.map((caja: Caja) => ({
    ...caja,
    acumulado: {
      total: caja.total,
    },
  }));
  //acumular cajas en los grupos de cajas y acumular totales
  const gruposCajas = grupoCajas.map((grupoCaja: GrupoCaja) => ({
    ...grupoCaja,
    nombre: 'Cajas ' + grupoCaja.nombre,
    subcategorias: cajasModificadas.filter(
      (caja: Caja) => caja.grupoCaja.id === grupoCaja.id
    ),
    meses: parsearObjeto(mesesVacios),
    acumulado: {
      total: 0,
      cajas: [],
    },
  }));

  gruposCajas.forEach((grupoCaja: GrupoCaja) => {
    grupoCaja.acumulado!.total = grupoCaja.subcategorias.reduce(
      (total: number, caja: Caja) => total + caja['acumulado'].total,
      0
    );
    grupoCaja.subcategorias.forEach((subcategoria: Caja) => {
      grupoCaja.meses = acumularMeses({
        acumulador: grupoCaja.meses,
        meses: subcategoria['meses'],
      });
    });
  });
  return gruposCajas;
};
export const acumularMeses = ({ acumulador, meses, suma = true }) => {
  const suma_resta = suma ? 1 : -1;

  return acumulador.map((mes, numeroMes) => {
    return {
      ...mes,
      total: mes.total + meses[numeroMes].total * suma_resta,
      semanas: mes.semanas.map((semana, numeroSemana) => ({
        ...semana,
        total:
          semana.total +
          meses[numeroMes].semanas[numeroSemana].total * suma_resta,
      })),
    };
  });
};

export const acumularMesesTotales = (categoria) => {
  let meses = parsearObjeto(mesesVacios);
  categoria.subcategorias.forEach((categoria) => {
    meses = acumularMeses({
      acumulador: meses,
      meses: categoria.meses,
    });
  });
  const total = {
    nombre: 'Total',
    acumulado: {
      total: categoria.total,
    },
    meses,
  };
  return total;
};