export const meses = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];
export const colores = {
  positivo: '#96D2A4',
  negativo: '#EF9A9A',
  resultado: 'blue',
};
export const filas = {
  resultado: 'Resultado',
  ingreso: 'Ingreso',
  egreso: 'Egreso',
  disponible: 'Disponible',
};
export enum FilasColores {
  ingreso = '#96D2A4',
  egreso = '#EF9A9A',
  resultado = '#107acc',
  disponible = '#96D2A4',
  blanco = 'white',
}
export const filaResultado = 'Resultado';

export const filtrosDevExtreme = {
  tipo: [
    {
      id: 'in',
      nombre: 'Ingreso',
    },
    {
      id: 'out',
      nombre: 'Egreso',
    },
  ],
  general: [
    {
      id: true,
      nombre: 'General',
    },
    {
      id: false,
      nombre: 'No general',
    },
  ],
};
