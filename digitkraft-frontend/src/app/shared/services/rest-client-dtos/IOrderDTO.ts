
export interface IOrderDTO {
    username: string;
    password: string;
    repeatPassword: string;
    email: string;
    id: number;
    orderStatus: string;
    paymentMethod: string;
    shipment: {
        id: number,
        name: string,
        price: number,
    };
    code: string;
    sendDate: string;
    placementDate: string;
    price: string;
}
