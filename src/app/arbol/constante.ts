import { Caja, Categoria } from './arbol.interaces';
export interface Reporte {
  total: number;
  cajas: Caja[];
  ingresos: Categoria;
  egresos: Categoria;
}
export const reporte: Reporte = {
  total: -13783744,
  cajas: [
    {
      id: 8,
      nombre: 'Caja Wallas',
      idUnidadNegocio: '9',
      negativa: false,
      fechaBorrado: null,
      total: 385446,
    },
    {
      id: 9,
      nombre: 'Caja Wallas VIP',
      idUnidadNegocio: '9',
      negativa: false,
      fechaBorrado: null,
      total: -14169190,
    },
  ],
  ingresos: {
    id: -1,
    fechaBorrado: null,
    idCategoriaPadre: null,
    idEmpresa: null,
    nombre: 'Ingreso',
    orden: 1,
    tipo: 'in',
    subcategorias: [
      {
        id: 15,
        nombre: 'Ingreso',
        tipo: 'in',
        idEmpresa: '11',
        idCategoriaPadre: null,
        orden: '1',
        fechaBorrado: null,
        subcategorias: [
          {
            id: 26,
            nombre: 'Previa',
            tipo: 'in',
            idEmpresa: '11',
            idCategoriaPadre: '15',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 1610,
              cajas: [
                {
                  id: 8,
                  nombre: 'Caja Wallas',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 1610,
                },
              ],
            },
            meses: [
              {
                total: 10,
              },
              {
                total: 1600,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
          {
            id: 27,
            nombre: 'Qr',
            tipo: 'in',
            idEmpresa: '11',
            idCategoriaPadre: '15',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 7800,
              cajas: [
                {
                  id: 8,
                  nombre: 'Caja Wallas',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 7800,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 7800,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
          {
            id: 28,
            nombre: 'Qr vencidos',
            tipo: 'in',
            idEmpresa: '11',
            idCategoriaPadre: '15',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 7800,
              cajas: [
                {
                  id: 9,
                  nombre: 'Caja Wallas VIP',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 7800,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 7800,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
          {
            id: 29,
            nombre: 'Pleno',
            tipo: 'in',
            idEmpresa: '11',
            idCategoriaPadre: '15',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 95470,
              cajas: [
                {
                  id: 9,
                  nombre: 'Caja Wallas VIP',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 7800,
                },
                {
                  id: 8,
                  nombre: 'Caja Wallas',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 87670,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 7800,
              },
              {
                total: 79870,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 7800,
              },
              {
                total: 0,
              },
            ],
          },
          {
            id: 30,
            nombre: 'Living',
            tipo: 'in',
            idEmpresa: '11',
            idCategoriaPadre: '15',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 0,
              cajas: [],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
        ],
        acumulado: {
          total: 112680,
          cajas: [
            {
              id: 8,
              nombre: 'Caja Wallas',
              idUnidadNegocio: '9',
              negativa: false,
              fechaBorrado: null,
              total: 97080,
            },
            {
              id: 9,
              nombre: 'Caja Wallas VIP',
              idUnidadNegocio: '9',
              negativa: false,
              fechaBorrado: null,
              total: 15600,
            },
          ],
        },
        meses: [
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
        ],
      },
      {
        id: 16,
        nombre: 'Comida',
        tipo: 'in',
        idEmpresa: '11',
        idCategoriaPadre: null,
        orden: '1',
        fechaBorrado: null,
        subcategorias: [
          {
            id: 31,
            nombre: 'Menu',
            tipo: 'in',
            idEmpresa: '11',
            idCategoriaPadre: '16',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 110000,
              cajas: [
                {
                  id: 9,
                  nombre: 'Caja Wallas VIP',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 110000,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 110000,
              },
            ],
          },
          {
            id: 32,
            nombre: 'Carta',
            tipo: 'in',
            idEmpresa: '11',
            idCategoriaPadre: '16',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 10,
              cajas: [
                {
                  id: 9,
                  nombre: 'Caja Wallas VIP',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 10,
                },
              ],
            },
            meses: [
              {
                total: 10,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
        ],
        acumulado: {
          total: 110010,
          cajas: [
            {
              id: 9,
              nombre: 'Caja Wallas VIP',
              idUnidadNegocio: '9',
              negativa: false,
              fechaBorrado: null,
              total: 110010,
            },
          ],
        },
        meses: [
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
        ],
      },
      {
        id: 17,
        nombre: 'Bebida',
        tipo: 'in',
        idEmpresa: '11',
        idCategoriaPadre: null,
        orden: '1',
        fechaBorrado: null,
        subcategorias: [
          {
            id: 33,
            nombre: 'Living',
            tipo: 'in',
            idEmpresa: '11',
            idCategoriaPadre: '17',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 456456,
              cajas: [
                {
                  id: 8,
                  nombre: 'Caja Wallas',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 456456,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 456456,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
          {
            id: 34,
            nombre: 'General',
            tipo: 'in',
            idEmpresa: '11',
            idCategoriaPadre: '17',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 120000,
              cajas: [
                {
                  id: 8,
                  nombre: 'Caja Wallas',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 120000,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 120000,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
        ],
        acumulado: {
          total: 576456,
          cajas: [
            {
              id: 8,
              nombre: 'Caja Wallas',
              idUnidadNegocio: '9',
              negativa: false,
              fechaBorrado: null,
              total: 576456,
            },
          ],
        },
        meses: [
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
        ],
      },
      {
        id: 18,
        nombre: 'Otros',
        tipo: 'in',
        idEmpresa: '11',
        idCategoriaPadre: null,
        orden: '1',
        fechaBorrado: null,
        subcategorias: [
          {
            id: 35,
            nombre: 'Cigarrillos',
            tipo: 'in',
            idEmpresa: '11',
            idCategoriaPadre: '18',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 3000,
              cajas: [
                {
                  id: 9,
                  nombre: 'Caja Wallas VIP',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 3000,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 3000,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
          {
            id: 36,
            nombre: 'Guardaropa',
            tipo: 'in',
            idEmpresa: '11',
            idCategoriaPadre: '18',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 1000,
              cajas: [
                {
                  id: 8,
                  nombre: 'Caja Wallas',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 1000,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 1000,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
        ],
        acumulado: {
          total: 4000,
          cajas: [
            {
              id: 9,
              nombre: 'Caja Wallas VIP',
              idUnidadNegocio: '9',
              negativa: false,
              fechaBorrado: null,
              total: 3000,
            },
            {
              id: 8,
              nombre: 'Caja Wallas',
              idUnidadNegocio: '9',
              negativa: false,
              fechaBorrado: null,
              total: 1000,
            },
          ],
        },
        meses: [
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
        ],
      },
    ],
    acumulado: {
      total: 803146,
      cajas: [
        {
          id: 8,
          nombre: 'Caja Wallas',
          idUnidadNegocio: '9',
          negativa: false,
          fechaBorrado: null,
          total: 674536,
        },
        {
          id: 9,
          nombre: 'Caja Wallas VIP',
          idUnidadNegocio: '9',
          negativa: false,
          fechaBorrado: null,
          total: 128610,
        },
      ],
    },
    meses: [
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
    ],
  },
  egresos: {
    id: -2,
    fechaBorrado: null,
    idCategoriaPadre: null,
    idEmpresa: null,
    nombre: 'Egreso',
    orden: 1,
    tipo: 'out',
    subcategorias: [
      {
        id: 19,
        nombre: 'Operativos Directos',
        tipo: 'out',
        idEmpresa: '11',
        idCategoriaPadre: null,
        orden: '1',
        fechaBorrado: null,
        subcategorias: [
          {
            id: 37,
            nombre: 'Adicional de policia blanco',
            tipo: 'out',
            idEmpresa: '11',
            idCategoriaPadre: '19',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 1000,
              cajas: [
                {
                  id: 9,
                  nombre: 'Caja Wallas VIP',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 1000,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 1000,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
          {
            id: 38,
            nombre: 'Adicional de policia negro',
            tipo: 'out',
            idEmpresa: '11',
            idCategoriaPadre: '19',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 9800,
              cajas: [
                {
                  id: 9,
                  nombre: 'Caja Wallas VIP',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 9800,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 9800,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
        ],
        acumulado: {
          total: 10800,
          cajas: [
            {
              id: 9,
              nombre: 'Caja Wallas VIP',
              idUnidadNegocio: '9',
              negativa: false,
              fechaBorrado: null,
              total: 10800,
            },
          ],
        },
        meses: [
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
        ],
      },
      {
        id: 20,
        nombre: 'Sueldos',
        tipo: 'out',
        idEmpresa: '11',
        idCategoriaPadre: null,
        orden: '1',
        fechaBorrado: null,
        subcategorias: [
          {
            id: 39,
            nombre: 'Javier - Encargado General',
            tipo: 'out',
            idEmpresa: '11',
            idCategoriaPadre: '20',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 12000,
              cajas: [
                {
                  id: 8,
                  nombre: 'Caja Wallas',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 12000,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 12000,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
          {
            id: 40,
            nombre: 'Mario - Encargado deposito',
            tipo: 'out',
            idEmpresa: '11',
            idCategoriaPadre: '20',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 12000,
              cajas: [
                {
                  id: 8,
                  nombre: 'Caja Wallas',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 12000,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 12000,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
          {
            id: 41,
            nombre: 'Estefania - Encargado cocina',
            tipo: 'out',
            idEmpresa: '11',
            idCategoriaPadre: '20',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 12000,
              cajas: [
                {
                  id: 8,
                  nombre: 'Caja Wallas',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 12000,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 12000,
              },
              {
                total: 0,
              },
            ],
          },
          {
            id: 42,
            nombre: 'Mauro - Encargado noche',
            tipo: 'out',
            idEmpresa: '11',
            idCategoriaPadre: '20',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 12000,
              cajas: [
                {
                  id: 8,
                  nombre: 'Caja Wallas',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 12000,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 12000,
              },
            ],
          },
        ],
        acumulado: {
          total: 48000,
          cajas: [
            {
              id: 8,
              nombre: 'Caja Wallas',
              idUnidadNegocio: '9',
              negativa: false,
              fechaBorrado: null,
              total: 48000,
            },
          ],
        },
        meses: [
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
        ],
      },
      {
        id: 21,
        nombre: 'Publicidad y promocion',
        tipo: 'out',
        idEmpresa: '11',
        idCategoriaPadre: null,
        orden: '1',
        fechaBorrado: null,
        subcategorias: [
          {
            id: 43,
            nombre: 'Fotografo',
            tipo: 'out',
            idEmpresa: '11',
            idCategoriaPadre: '21',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 10,
              cajas: [
                {
                  id: 8,
                  nombre: 'Caja Wallas',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 10,
                },
              ],
            },
            meses: [
              {
                total: 10,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
          {
            id: 44,
            nombre: 'Diseñador',
            tipo: 'out',
            idEmpresa: '11',
            idCategoriaPadre: '21',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 780,
              cajas: [
                {
                  id: 8,
                  nombre: 'Caja Wallas',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 780,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 780,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
          {
            id: 45,
            nombre: 'Video',
            tipo: 'out',
            idEmpresa: '11',
            idCategoriaPadre: '21',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 12300,
              cajas: [
                {
                  id: 8,
                  nombre: 'Caja Wallas',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 12300,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 12300,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
        ],
        acumulado: {
          total: 13090,
          cajas: [
            {
              id: 8,
              nombre: 'Caja Wallas',
              idUnidadNegocio: '9',
              negativa: false,
              fechaBorrado: null,
              total: 13090,
            },
          ],
        },
        meses: [
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
        ],
      },
      {
        id: 22,
        nombre: 'Artistica + Ambientacion',
        tipo: 'out',
        idEmpresa: '11',
        idCategoriaPadre: null,
        orden: '1',
        fechaBorrado: null,
        subcategorias: [
          {
            id: 46,
            nombre: 'Dj 1',
            tipo: 'out',
            idEmpresa: '11',
            idCategoriaPadre: '22',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 70000,
              cajas: [
                {
                  id: 8,
                  nombre: 'Caja Wallas',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 70000,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 70000,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
          {
            id: 47,
            nombre: 'Dj 2',
            tipo: 'out',
            idEmpresa: '11',
            idCategoriaPadre: '22',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 70000,
              cajas: [
                {
                  id: 8,
                  nombre: 'Caja Wallas',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 70000,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 70000,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
        ],
        acumulado: {
          total: 140000,
          cajas: [
            {
              id: 8,
              nombre: 'Caja Wallas',
              idUnidadNegocio: '9',
              negativa: false,
              fechaBorrado: null,
              total: 140000,
            },
          ],
        },
        meses: [
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
        ],
      },
      {
        id: 23,
        nombre: 'Convocatoria',
        tipo: 'out',
        idEmpresa: '11',
        idCategoriaPadre: null,
        orden: '1',
        fechaBorrado: null,
        subcategorias: [
          {
            id: 48,
            nombre: 'Relaciones Publicas India',
            tipo: 'out',
            idEmpresa: '11',
            idCategoriaPadre: '23',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 6000,
              cajas: [
                {
                  id: 8,
                  nombre: 'Caja Wallas',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 6000,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 6000,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
          {
            id: 49,
            nombre: 'Relaciones Publicas Wallas',
            tipo: 'out',
            idEmpresa: '11',
            idCategoriaPadre: '23',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 78000,
              cajas: [
                {
                  id: 8,
                  nombre: 'Caja Wallas',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 78000,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 78000,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
        ],
        acumulado: {
          total: 84000,
          cajas: [
            {
              id: 8,
              nombre: 'Caja Wallas',
              idUnidadNegocio: '9',
              negativa: false,
              fechaBorrado: null,
              total: 84000,
            },
          ],
        },
        meses: [
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
        ],
      },
      {
        id: 24,
        nombre: 'Comision por venta',
        tipo: 'out',
        idEmpresa: '11',
        idCategoriaPadre: null,
        orden: '1',
        fechaBorrado: null,
        subcategorias: [
          {
            id: 50,
            nombre: 'Early Ticket',
            tipo: 'out',
            idEmpresa: '11',
            idCategoriaPadre: '24',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 1000,
              cajas: [
                {
                  id: 8,
                  nombre: 'Caja Wallas',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 1000,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 1000,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
          {
            id: 51,
            nombre: 'Mesas Vip',
            tipo: 'out',
            idEmpresa: '11',
            idCategoriaPadre: '24',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 3000,
              cajas: [
                {
                  id: 8,
                  nombre: 'Caja Wallas',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 3000,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 3000,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
        ],
        acumulado: {
          total: 4000,
          cajas: [
            {
              id: 8,
              nombre: 'Caja Wallas',
              idUnidadNegocio: '9',
              negativa: false,
              fechaBorrado: null,
              total: 4000,
            },
          ],
        },
        meses: [
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
        ],
      },
      {
        id: 25,
        nombre: 'Varios',
        tipo: 'out',
        idEmpresa: '11',
        idCategoriaPadre: null,
        orden: '1',
        fechaBorrado: null,
        subcategorias: [
          {
            id: 52,
            nombre: 'Comida personal',
            tipo: 'out',
            idEmpresa: '11',
            idCategoriaPadre: '25',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 7000,
              cajas: [
                {
                  id: 9,
                  nombre: 'Caja Wallas VIP',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 7000,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 7000,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
          {
            id: 55,
            nombre: 'TQR',
            tipo: 'out',
            idEmpresa: '11',
            idCategoriaPadre: '25',
            orden: '1',
            fechaBorrado: null,
            subcategorias: [],
            acumulado: {
              total: 14280000,
              cajas: [
                {
                  id: 9,
                  nombre: 'Caja Wallas VIP',
                  idUnidadNegocio: '9',
                  negativa: false,
                  fechaBorrado: null,
                  total: 14280000,
                },
              ],
            },
            meses: [
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 7140000,
              },
              {
                total: 7140000,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
              {
                total: 0,
              },
            ],
          },
        ],
        acumulado: {
          total: 14287000,
          cajas: [
            {
              id: 9,
              nombre: 'Caja Wallas VIP',
              idUnidadNegocio: '9',
              negativa: false,
              fechaBorrado: null,
              total: 14287000,
            },
          ],
        },
        meses: [
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
          {
            total: 0,
          },
        ],
      },
    ],
    acumulado: {
      total: 14586890,
      cajas: [
        {
          id: 9,
          nombre: 'Caja Wallas VIP',
          idUnidadNegocio: '9',
          negativa: false,
          fechaBorrado: null,
          total: 14297800,
        },
        {
          id: 8,
          nombre: 'Caja Wallas',
          idUnidadNegocio: '9',
          negativa: false,
          fechaBorrado: null,
          total: 289090,
        },
      ],
    },
    meses: [
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
      {
        total: 0,
      },
    ],
  },
};
