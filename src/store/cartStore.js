import {defineStore} from "pinia";
import axios from "axios";
import {API_URL} from "@/api";

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: null
    }),
    actions: {
        //todo: check if working!
        async addProductToBasket(cartProduct) {
            console.log(cartProduct)
            const productResponse = await axios.post(API_URL + 'baskets/item', cartProduct);
            this.cart = productResponse.data;
            console.log(productResponse.data);
        },
        async loadItems() {
            const productResponse = await axios.get(API_URL + 'baskets');
            this.cart = productResponse.data;
        },
        async updateCartItem(item, itemId) {
            const productResponse = await axios.put(API_URL + 'baskets/item/' + itemId, item);
            this.cart = productResponse.data;
        },
        async deleteItem(item, itemId) {
            const productResponse = await axios.delete(API_URL + 'baskets/item/' + itemId);
            this.cart = this.loadItems();
        },
        async addOrder(order) {
            const productResponse = await axios.put(API_URL + 'baskets');
            console.log(productResponse.data);
            this.cart = productResponse.data;
        }
    }
});
