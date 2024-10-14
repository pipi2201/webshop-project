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
        async findProductById(productId) {
            const product = this.products.find(p => p.productId === productId);
            if (!product) {
                const productFound = await axios.get(API_URL + 'products' + productId);
                this.products.push(productFound.data);
            }
        },
        async updateProduct(productId, updatedProduct) {
            const updateProductResponse = await axios.put(API_URL + 'products/' + productId, updatedProduct);
            const index = this.products.findIndex(p => p.productId === productId);
            this.products.splice(index, 1, updateProductResponse.data);
        },
        async deleteProduct(productId) {
            const deleteProductResponse = await axios.delete(API_URL + 'products/' + productId);
            console.log(deleteProductResponse);
            const index = this.products.findIndex(p => p.productId === productId);
            this.products.splice(index, 1);
        }
    }
})
