export interface Shoe {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
}

export interface CartItem extends Shoe {
    quantity: number;
}
