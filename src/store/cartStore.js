import {defineStore} from "pinia";
import axios from "axios";
import {API_URL} from "@/api";

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: null
    }),
    actions: {
        async addProductToBasket(cartProduct) {
            const productResponse = await axios.post(API_URL + 'baskets/item', cartProduct);
            console.log(productResponse.data);
            this.cart = productResponse.data;
        },
        async loadItems() {
            const productResponse = await axios.get(API_URL + 'baskets');
            console.log(productResponse.data);
            this.cart = productResponse.data;
        },
        async updateCartItem(item, itemId) {
            const productResponse = await axios.put(API_URL + 'baskets/item/' + itemId);
            this.cart = productResponse.data;
        }
    }
});
