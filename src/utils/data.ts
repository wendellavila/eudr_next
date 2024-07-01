import { CustomerData, OrderData, ReportData, UserData } from '@/typing/types';

interface ReportDataMap {
  [id: string]: ReportData;
}

export const dummyCustomerList: CustomerData[] = [
  { customerId: '1', customerName: 'Customer 1' },
  { customerId: '2', customerName: 'Customer 2' },
];

export const dummyUserData: UserData = {
  customerId: '1',
  customerName: 'ADMIN',
  email: 'admin@eudr_next',
  uid: '1',
  role: 'admin',
};

export const dummyOrders: OrderData = {
  orders: [
    {
      orderNumber: '1/2024',
      date: '20240101',
      volume: 1100,
      customerName: 'Customer 1',
    },
    {
      orderNumber: '2/2024',
      date: '20240102',
      volume: 1250,
      customerName: 'Customer 2',
    },
  ],
};

export const dummyReportData: ReportDataMap = {
  '1/2024': {
    orderNumber: '1/2024',
    orderDate: '20240101',
    countryCode: 'it',
    customerName: 'Customer 1',
    volume: 1100,
    status: 'unlocked',
    timestamp: '2024-04-16T16:24:00-03:00',
    suppliers: [
      {
        supplierName: 'João da Silva',
        farmId: 'AA-0000000-00000000000000000000000000000000',
        city: 'Muzambinho',
        state: 'MG',
        area: 1234.56,
        status: 'unlocked',
        lastUpdate: '2023-12-19T11:09:32.000Z',
        protocol: [
          {
            type: 'ALERTA_MAPBIOMAS',
            status: 'NO_ALERT',
            details:
              'A propriedade não possui sobreposição com alertas de desmatamento do MapBiomas a partir de 31/12/2020.',
          },
          {
            type: 'EMBARGO_IBAMA',
            status: 'NO_ALERT',
            details:
              'A Propriedade não possui sobreposição com embargo do IBAMA.',
          },
          {
            type: 'EMBARGO_IBAMA_DOCUMENT',
            status: 'NO_ALERT',
            details: 'O CPF/CNPJ não consta na lista de embargos do IBAMA.',
          },
          {
            type: 'EMBARGO_ICMBIO',
            status: 'NO_ALERT',
            details:
              'A Propriedade não possui sobreposição com embargo do ICMBio.',
          },
          {
            type: 'EMBARGO_ICMBIO_DOCUMENT',
            status: 'NO_ALERT',
            details: 'O CPF/CNPJ não consta na lista de embargos do ICMBIO.',
          },
          {
            type: 'EMBARGO_SEMA',
            status: 'NO_ALERT',
            details:
              'A Propriedade não possui sobreposição com embargo do SEMA-MT.',
          },
          {
            type: 'EMBARGO_SEMA_DOCUMENT',
            status: 'NO_ALERT',
            details: 'O CPF/CNPJ não consta na lista de embargos do SEMA-MT.',
          },
          {
            type: 'EMBARGO_SLAVERIES_DOCUMENT',
            status: 'NO_ALERT',
            details: 'O CPF/CNPJ não consta na lista suja do Trabalho Escravo.',
          },
          {
            type: 'PRODES_ANY',
            status: 'NO_ALERT',
            details:
              'A propriedade não possui sobreposição com PRODES a partir de 31/12/2020.',
          },
          {
            type: 'QUILOMBOS',
            status: 'NO_ALERT',
            details:
              'A propriedade não possui sobreposição com áreas de Quilombos.',
          },
          {
            type: 'SITUACAO_CAR',
            status: 'NO_ALERT',
            details: 'A propriedade possui CAR com situação ativo ou pendente.',
          },
          {
            type: 'TERRAS_INDIGENAS',
            status: 'NO_ALERT',
            details:
              'A Propriedade não possui sobreposição com Terras Indígenas.',
          },
          {
            type: 'UNIDADES_CONSERVACAO_APA_WARNING',
            status: 'NO_ALERT',
            details:
              'A Propriedade não possui sobreposição com Unidade de Conservação.',
          },
        ],
        coordinates: [
          [-46.30084111, -21.27463303],
          [-46.30219446, -21.2755083],
          [-46.30226539, -21.27426359],
          [-46.3010884, -21.27579323],
          [-46.30061954, -21.27628911],
          [-46.30084111, -21.27463303],
        ],
      },
    ],
  },
  '2/2024': {
    orderNumber: '2/2024',
    orderDate: '20240102',
    countryCode: 'uk',
    customerName: 'Customer 2',
    volume: 1250,
    status: 'locked',
    timestamp: '2024-04-16T16:24:00-03:00',
    suppliers: [
      {
        supplierName: 'João da Silva',
        farmId: 'AA-0000000-00000000000000000000000000000000',
        city: 'Muzambinho',
        state: 'MG',
        area: 1234.56,
        status: 'unlocked',
        lastUpdate: '2023-12-19T11:09:32.000Z',
        protocol: [
          {
            type: 'ALERTA_MAPBIOMAS',
            status: 'NO_ALERT',
            details:
              'A propriedade não possui sobreposição com alertas de desmatamento do MapBiomas a partir de 31/12/2020.',
          },
          {
            type: 'EMBARGO_IBAMA',
            status: 'NO_ALERT',
            details:
              'A Propriedade não possui sobreposição com embargo do IBAMA.',
          },
          {
            type: 'EMBARGO_IBAMA_DOCUMENT',
            status: 'NO_ALERT',
            details: 'O CPF/CNPJ não consta na lista de embargos do IBAMA.',
          },
          {
            type: 'EMBARGO_ICMBIO',
            status: 'NO_ALERT',
            details:
              'A Propriedade não possui sobreposição com embargo do ICMBio.',
          },
          {
            type: 'EMBARGO_ICMBIO_DOCUMENT',
            status: 'NO_ALERT',
            details: 'O CPF/CNPJ não consta na lista de embargos do ICMBIO.',
          },
          {
            type: 'EMBARGO_SEMA',
            status: 'NO_ALERT',
            details:
              'A Propriedade não possui sobreposição com embargo do SEMA-MT.',
          },
          {
            type: 'EMBARGO_SEMA_DOCUMENT',
            status: 'NO_ALERT',
            details: 'O CPF/CNPJ não consta na lista de embargos do SEMA-MT.',
          },
          {
            type: 'EMBARGO_SLAVERIES_DOCUMENT',
            status: 'NO_ALERT',
            details: 'O CPF/CNPJ não consta na lista suja do Trabalho Escravo.',
          },
          {
            type: 'PRODES_ANY',
            status: 'NO_ALERT',
            details:
              'A propriedade não possui sobreposição com PRODES a partir de 31/12/2020.',
          },
          {
            type: 'QUILOMBOS',
            status: 'NO_ALERT',
            details:
              'A propriedade não possui sobreposição com áreas de Quilombos.',
          },
          {
            type: 'SITUACAO_CAR',
            status: 'NO_ALERT',
            details: 'A propriedade possui CAR com situação ativo ou pendente.',
          },
          {
            type: 'TERRAS_INDIGENAS',
            status: 'NO_ALERT',
            details:
              'A Propriedade não possui sobreposição com Terras Indígenas.',
          },
          {
            type: 'UNIDADES_CONSERVACAO_APA_WARNING',
            status: 'NO_ALERT',
            details:
              'A Propriedade não possui sobreposição com Unidade de Conservação.',
          },
        ],
        coordinates: [
          [-46.30084111, -21.27463303],
          [-46.30219446, -21.2755083],
          [-46.30226539, -21.27426359],
          [-46.3010884, -21.27579323],
          [-46.30061954, -21.27628911],
          [-46.30084111, -21.27463303],
        ],
      },
      {
        supplierName: 'Maria dos Santos',
        farmId: 'AA-0000000-00000000000000000000000000000001',
        city: 'Passos',
        state: 'MG',
        area: 2345.0,
        status: 'locked',
        lastUpdate: '2023-12-28T16:26:11.000Z',
        protocol: [
          {
            type: 'ALERTA_MAPBIOMAS',
            status: 'HIGH',
            details:
              'A propriedade possui sobreposição com alertas de desmatamento do MapBiomas de 0.70 ha com data superior ou igual a 31/12/2020.',
          },
          {
            type: 'EMBARGO_IBAMA',
            status: 'NO_ALERT',
            details:
              'A Propriedade não possui sobreposição com embargo do IBAMA.',
          },
          {
            type: 'EMBARGO_IBAMA_DOCUMENT',
            status: 'NO_ALERT',
            details: 'O CPF/CNPJ não consta na lista de embargos do IBAMA.',
          },
          {
            type: 'EMBARGO_ICMBIO',
            status: 'NO_ALERT',
            details:
              'A Propriedade não possui sobreposição com embargo do ICMBio.',
          },
          {
            type: 'EMBARGO_ICMBIO_DOCUMENT',
            status: 'NO_ALERT',
            details: 'O CPF/CNPJ não consta na lista de embargos do ICMBIO.',
          },
          {
            type: 'EMBARGO_SEMA',
            status: 'NO_ALERT',
            details:
              'A Propriedade não possui sobreposição com embargo do SEMA-MT.',
          },
          {
            type: 'EMBARGO_SEMA_DOCUMENT',
            status: 'NO_ALERT',
            details: 'O CPF/CNPJ não consta na lista de embargos do SEMA-MT.',
          },
          {
            type: 'EMBARGO_SLAVERIES_DOCUMENT',
            status: 'NO_ALERT',
            details: 'O CPF/CNPJ não consta na lista suja do Trabalho Escravo.',
          },
          {
            type: 'PRODES_ANY',
            status: 'NO_ALERT',
            details:
              'A propriedade não possui sobreposição com PRODES a partir de 31/12/2020.',
          },
          {
            type: 'QUILOMBOS',
            status: 'NO_ALERT',
            details:
              'A propriedade não possui sobreposição com áreas de Quilombos.',
          },
          {
            type: 'SITUACAO_CAR',
            status: 'NO_ALERT',
            details: 'A propriedade possui CAR com situação ativo ou pendente.',
          },
          {
            type: 'TERRAS_INDIGENAS',
            status: 'NO_ALERT',
            details:
              'A Propriedade não possui sobreposição com Terras Indígenas.',
          },
          {
            type: 'UNIDADES_CONSERVACAO_APA_WARNING',
            status: 'NO_ALERT',
            details:
              'A Propriedade não possui sobreposição com Unidade de Conservação.',
          },
        ],
        coordinates: [
          [-46.581764, -20.92652],
          [-46.571292, -20.923333],
          [-46.565661, -20.927231],
          [-46.563125, -20.928073],
          [-46.568625, -20.928905],
          [-46.56459, -20.927292],
          [-46.581764, -20.92652],
        ],
      },
    ],
  },
};
