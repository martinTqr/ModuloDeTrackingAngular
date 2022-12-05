export const redireccionar = (url: string) => {
  window.location.href = url;
};
export const recargarPagina = () => {
  window.location.reload();
};
export const volverPaginaAnterior = () => {
  window.history.back();
};
