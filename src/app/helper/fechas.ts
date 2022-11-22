const obtenerSemanaPorMes = (fecha: Date) => {
  const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
  const ultimoDia = new Date(
    fecha.getFullYear(),
    fecha.getMonth() + 1,
    0
  ).getDate();

  const semanas = [];
  for (let i = 1; i <= ultimoDia; i += 7) {
    const fechaInicio = new Date(
      primerDia.getFullYear(),
      primerDia.getMonth(),
      i
    );
    const inicioFormateado =
      fechaInicio.getDate() + '/' + (fechaInicio.getMonth() + 1);
    const fechaFin = new Date(
      primerDia.getFullYear(),
      primerDia.getMonth(),
      i + 6 > ultimoDia ? ultimoDia : i + 6
    );
    const finFormateado = fechaFin.getDate() + '/' + (fechaFin.getMonth() + 1);
    semanas.push({
      semana: inicioFormateado + ' - ' + finFormateado,
      total: 0,
    });
  }
  return semanas;
};

export const dias = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
];
const meses = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
export const mesesVacios = meses.map((__, numeroMes) => ({
  total: 0,
  semanas: obtenerSemanaPorMes(new Date(2022, numeroMes, 1)),
}));
