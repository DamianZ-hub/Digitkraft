export interface IAddOrderDto {
    shipment: {
        name: string,
        price: number
    };
    address: {
        country: string
        region: string
        city: string
        postCode: string
        street: string
        house: string
        apartment: string
    }
}
