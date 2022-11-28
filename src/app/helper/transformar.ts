export const transformarAString = (valor: any): string => {
  return valor.toString();
};
enum Formato {
  fecha = 10,
  fechaHora = 16,
}

export const parsearFecha = (
  fecha: string,
  formato: string = 'fecha'
): string => {
  //quitar la T de la fecha
  fecha = fecha.replace('T', ' ');

  return fecha.slice(0, Formato[formato]);
};
export const parsearObjeto = (objeto: any) =>
  JSON.parse(JSON.stringify(objeto));

export const separarMiles = (numero: number): string => {
  let numeroString = numero.toString().replace('.', ',');
  //separar los miles
  numeroString = numeroString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return numeroString;
};
