
export interface CheckboxSelection {
    name: string;
    value: number;
}

export interface Server {
    servers: ServerData[]
}

export interface ServerData {
    hdd: HDD;
    location: string;
    model: string;
    price: Price;
    ram: Ram;  
}

interface Ram {
    memory: string;
    type: string;
    unit: string;
}

interface HDD {
    count: string;
    memory: string;
    type: string;
    unit: string;
}

interface Price {
    amountCents: number;
    currency: string;
    currencySymbol: string;
}
export interface ServerPayloadInput {
    sliderControl: Array<number>;
    ramChoice: Array<number>;
    hddChoice: Array<string>;
    locationChoice: Array<string>;
}