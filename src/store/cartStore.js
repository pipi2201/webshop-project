import {defineStore} from "pinia";
import axios from "axios";
import {API_URL} from "@/api";

export const useCartStore = defineStore('cart', {
    state: () => ({
        carts: {}
    }),
    actions: {
        async addProductToBasket(cartProduct) {
            console.log(cartProduct);
            const productResponse = await axios.post(API_URL + 'baskets/item', cartProduct);
            console.log(productResponse.data);
            this.carts = productResponse.data;
            console.log(this.carts.items.length);
        },
        async getProductsInCart() {
            const productResponse = await axios.get(API_URL + 'baskets');
            console.log(productResponse.data);
        }
    }
});
