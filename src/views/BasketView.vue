<script setup>
import {useCartStore} from "@/store/cartStore";
import {computed, onMounted, ref} from "vue";
import CartItem from "@/components/CartItem.vue";
import {useProductStore} from "@/store/productStore";

const cartStore = useCartStore();
const productStore = useProductStore();

onMounted(() => {
    cartStore.loadItems();
    productStore.loadProducts();
})

const total = computed( () => {
    return cartStore.cart?.items?.reduce((total, item) => {
        const product = productStore.products.find(p => p.productId === item.productId)
        return total + parseInt(item.amount) * parseInt(product?.price ?? 0);
    }, 0)
})

</script>
<template>
    <h1>Warenkorb</h1>
    <div v-if="!cartStore.cart?.items" class="text-center ma-16">
        <h3>No Products in Cart</h3>
    </div>
    <v-row>
        <v-col cols="4" v-for="i in cartStore.cart?.items">
            <CartItem :item="i"></CartItem>
        </v-col>
    </v-row>
    <h3>Gesamtpreis: {{total}}€</h3>
</template>
