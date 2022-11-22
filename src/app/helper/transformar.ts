export const transformarAString = (valor: any): string => {
  return valor.toString();
};
export const parsearFecha = (fecha: Date): string => {
  return fecha.toString().slice(0, 10);
};
export const parsearObjeto = (objeto: any) =>
  JSON.parse(JSON.stringify(objeto));
