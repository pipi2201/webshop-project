import {defineStore} from "pinia";
import {API_URL} from "@/api";
import axios from "axios";

export const useProductStore = defineStore('product', {
    state: () => ({
        products: []
    }),
    actions: {
        async loadProducts() {
            const loadProductsResponse = await axios.get(API_URL + 'products');
            this.products = loadProductsResponse.data;
        },
        async addProduct(product) {
            const addProductResponse = await axios.post(API_URL + 'products', product);
            this.products.push(addProductResponse.data);
        },
        async updateProduct(productId, updatedProduct) {
            const updateProductResponse = await axios.put(API_URL + productId, updatedProduct);
            const index = this.products.findIndex(p => p.productId === productId);
            this.products.splice(index, 1, updateProductResponse.data);
        }
    }
})
