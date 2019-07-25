import { ShoppingCartItem } from './ShoppingCartItem';

export interface ShoppingCart {
    Id: number;
    CreatedDate: Date;
    Items: ShoppingCartItem[]
}