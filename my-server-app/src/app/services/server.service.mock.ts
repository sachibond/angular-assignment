import { CheckboxSelection, Server, ServerPayloadInput } from '../interfaces/server.interface';

export const MOCK_SERVER: Server = {
  servers: [
    {
      model: 'Dell R210Intel Xeon X3440',
      ram: {
        memory: '16',
        unit: 'GB',
        type: 'DDR3',
      },
      hdd: {
        memory: '2',
        count: '2',
        unit: 'TB',
        type: 'SATA2',
      },
      location: 'AmsterdamAMS-01',
      price: {
        currency: 'EUR',
        currencySymbol: '€',
        amountCents: 4999,
      },
    },
    {
      model: 'Dell R210-IIIntel Xeon E3-1230v2',
      ram: {
        memory: '16',
        unit: 'GB',
        type: 'DDR3',
      },
      hdd: {
        memory: '2',
        count: '2',
        unit: 'TB',
        type: 'SATA2',
      },
      location: 'AmsterdamAMS-01',
      price: {
        currency: 'EUR',
        currencySymbol: '€',
        amountCents: 7299,
      },
    },
  ],
};

export const MOCK_FILTER_INPUT: ServerPayloadInput = {
  sliderControl: [250, 500],
  ramChoice: [16],
  hddChoice: ['SATA2'],
  locationChoice: ['AmsterdamAMS-01'],
};

export const MOCK_CHECKBOX_SELECTION: CheckboxSelection = {
  name: '2GB',
  value: 2
}; 